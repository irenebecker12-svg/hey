#!/usr/bin/env node
/**
 * Higgsfield runner for the 99aupairs competition reel.
 *
 * Generates the character stills, then the 9 shot clips, and drops the videos
 * into ../edit/raw/ with the exact filenames assemble.sh expects.
 *
 * Run this on YOUR machine — Higgsfield is unreachable from the Claude Code
 * container (egress proxy returns 403 on the CONNECT tunnel).
 *
 *   export HF_CREDENTIALS="KEY_ID:KEY_SECRET"     # from cloud.higgsfield.ai
 *   node run.mjs stills --yes
 *   # review run/stills/*.jpg, edit stills.json if you want to swap any URL
 *   node run.mjs video --yes
 *
 * Flags:  --yes  required, confirms you're spending credits
 *         --only=shot3,shot7      regenerate a subset
 *         --concurrency=3         parallel jobs (default 3)
 *         --model=turbo|standard  DoP model (default turbo)
 *
 * NOTE ON ENDPOINTS: taken from the official SDK reference. docs.higgsfield.ai
 * was unreachable at authoring time, so the poll path in particular is a best
 * guess — every path and payload key lives in the CONFIG block below so you can
 * correct one line rather than hunt through the file. If a call 404s, check it
 * against the current docs first.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  base: process.env.HF_BASE ?? "https://platform.higgsfield.ai",
  soul: "/v1/text2image/soul",
  i2v: "/v1/image2video/dop",
  t2v: "/v1/text2video/dop",
  jobSet: process.env.HF_JOBSET_PATH ?? "/v1/job-sets/{id}",
  soulSize: "1080x1920",
  soulQuality: "hd",
  pollMs: 6000,
  pollTimeoutMs: 15 * 60 * 1000,
};

const args = process.argv.slice(2);
const cmd = args.find(a => !a.startsWith("--")) ?? "help";
const flag = (n, d) => { const m = args.find(a => a.startsWith(`--${n}=`)); return m ? m.split("=").slice(1).join("=") : d; };
const has = n => args.includes(`--${n}`);

const creds = process.env.HF_CREDENTIALS;
const only = flag("only") ? new Set(flag("only").split(",").map(s => s.trim())) : null;
const concurrency = Math.max(1, parseInt(flag("concurrency", "3"), 10));
const dopModel = flag("model", "turbo");

const log = (...m) => console.log(...m);
const die = m => { console.error("✗ " + m); process.exit(1); };

async function api(pathname, { method = "POST", body } = {}) {
  const res = await fetch(CONFIG.base + pathname, {
    method,
    headers: {
      Authorization: `Key ${creds}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${pathname} → ${res.status} ${text.slice(0, 400)}`);
  try { return JSON.parse(text); } catch { throw new Error(`${pathname} returned non-JSON: ${text.slice(0, 200)}`); }
}

/** Pull an id out of whatever shape the create call returns. */
const idOf = j => j?.id ?? j?.job_set_id ?? j?.jobSetId ?? j?.data?.id;

/** Pull the finished asset URL out of a job set. */
function urlOf(js) {
  const jobs = js?.jobs ?? js?.data?.jobs ?? [];
  for (const job of jobs) {
    const r = job?.results ?? job?.result;
    const u = r?.raw?.url ?? r?.min?.url ?? r?.url;
    if (u) return u;
  }
  return null;
}

const statusOf = js =>
  (js?.status ?? js?.data?.status ?? js?.jobs?.[0]?.status ?? "unknown").toLowerCase();

async function poll(id, label) {
  const deadline = Date.now() + CONFIG.pollTimeoutMs;
  let last = "";
  while (Date.now() < deadline) {
    const js = await api(CONFIG.jobSet.replace("{id}", id), { method: "GET" });
    const st = statusOf(js);
    if (st !== last) { log(`   ${label}: ${st}`); last = st; }
    if (st === "completed") {
      const u = urlOf(js);
      if (!u) throw new Error(`${label} completed but no asset URL in response`);
      return u;
    }
    if (st === "failed") throw new Error(`${label} failed`);
    if (st === "nsfw") throw new Error(`${label} rejected as NSFW — reword the prompt`);
    await new Promise(r => setTimeout(r, CONFIG.pollMs));
  }
  throw new Error(`${label} timed out after ${CONFIG.pollTimeoutMs / 60000} min`);
}

async function download(url, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${url} → ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return dest;
}

/** Run tasks with a fixed concurrency cap; never rejects, collects per-task errors. */
async function pool(items, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      try { results[i] = { ok: true, value: await worker(items[i], i) }; }
      catch (e) { results[i] = { ok: false, error: e.message, item: items[i] }; }
    }
  }));
  return results;
}

const loadPrompts = async () => JSON.parse(await readFile(path.join(HERE, "prompts.json"), "utf8"));
const stillsPath = path.join(HERE, "stills.json");

async function cmdStills(P) {
  const names = Object.keys(P.stills).filter(n => !only || only.has(n));
  if (!names.length) die("no stills matched --only");
  confirm(names.length, "image");

  // Hero first and alone — everything else references it.
  const ordered = names.includes("hero") ? ["hero", ...names.filter(n => n !== "hero")] : names;
  const out = await readJsonOr(stillsPath, {});

  for (const group of names.includes("hero") ? [["hero"], ordered.slice(1)] : [ordered]) {
    if (!group.length) continue;
    const res = await pool(group, async name => {
      log(`→ still ${name}`);
      const body = {
        prompt: P.stills[name],
        negative_prompt: P.negative_image,
        width_and_height: CONFIG.soulSize,
        quality: CONFIG.soulQuality,
        batch_size: 1,
      };
      if (name !== "hero" && out.hero) body.input_images = [{ type: "image_url", image_url: out.hero }];
      const url = await poll(idOf(await api(CONFIG.soul, { body })), name);
      await download(url, path.join(HERE, "stills", `${name}.jpg`));
      log(`✓ still ${name}`);
      return url;
    });
    group.forEach((n, i) => { if (res[i].ok) out[n] = res[i].value; });
    await writeFile(stillsPath, JSON.stringify(out, null, 2));
    report(res);
    if (group[0] === "hero" && !out.hero) die("hero still failed — nothing downstream can run");
  }

  log(`\n→ stills.json written. Review run/stills/*.jpg before running: node run.mjs video --yes`);
}

async function cmdVideo(P) {
  const stills = await readJsonOr(stillsPath, null);
  if (!stills) die("no stills.json — run `node run.mjs stills --yes` first");

  const shots = P.shots.filter(s => !only || only.has(s.id));
  if (!shots.length) die("no shots matched --only");
  const missing = shots.filter(s => s.still && !stills[s.still]).map(s => `${s.id} needs ${s.still}`);
  if (missing.length) die("missing stills:\n  " + missing.join("\n  "));
  confirm(shots.length, "video");

  const res = await pool(shots, async s => {
    log(`→ ${s.id}  ${s.title}`);
    const i2v = Boolean(s.still);
    const body = { model: dopModel, prompt: s.prompt, negative_prompt: P.negative_video };
    if (i2v) body.input_images = [{ type: "image_url", image_url: stills[s.still] }];
    const url = await poll(idOf(await api(i2v ? CONFIG.i2v : CONFIG.t2v, { body })), s.id);
    const dest = path.join(HERE, "..", "edit", "raw", `${s.id}.mp4`);
    await download(url, dest);
    log(`✓ ${s.id} → edit/raw/${s.id}.mp4`);
    return dest;
  });
  report(res, s => s.id);

  const ok = res.filter(r => r.ok).length;
  log(`\n${ok}/${shots.length} clips in edit/raw/`);
  if (ok === P.shots.length) log("→ next: cd ../edit && ./assemble.sh");
}

function confirm(n, kind) {
  if (has("yes")) return;
  die(`this will run ${n} ${kind} generation${n === 1 ? "" : "s"} and spend Higgsfield credits.\n` +
      `  Re-run with --yes to proceed.`);
}

function report(res, label = x => x) {
  for (const r of res) if (!r.ok) console.error(`✗ ${label(r.item)}: ${r.error}`);
}

const readJsonOr = async (p, d) => { try { return JSON.parse(await readFile(p, "utf8")); } catch { return d; } };

const P = await loadPrompts();
switch (cmd) {
  case "stills":
    if (!creds) die("set HF_CREDENTIALS=\"KEY_ID:KEY_SECRET\" (from cloud.higgsfield.ai)");
    await cmdStills(P); break;
  case "video":
    if (!creds) die("set HF_CREDENTIALS=\"KEY_ID:KEY_SECRET\" (from cloud.higgsfield.ai)");
    await cmdVideo(P); break;
  case "list":
    log("stills:"); for (const n of Object.keys(P.stills)) log(`  ${n}`);
    log("shots:");  for (const s of P.shots) log(`  ${s.id.padEnd(7)} ${s.still ? "i2v ← " + s.still : "t2v"}   ${s.title}`);
    break;
  default:
    log("usage: node run.mjs <stills|video|list> --yes [--only=shot3,shot7] [--concurrency=3] [--model=turbo]");
}
