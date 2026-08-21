# Higgsfield runner

Generates all 5 character stills and 9 shot clips, and drops the videos into
`../edit/raw/` with the filenames `assemble.sh` expects.

**Run this on your own machine.** Higgsfield is unreachable from the Claude Code
container — the network egress proxy returns 403 on the CONNECT tunnel for both
`platform.higgsfield.ai` and `cloud.higgsfield.ai`. Nothing about the API key changes that.

## Setup

Node 18+ (uses built-in `fetch`), no dependencies to install.

```bash
# cloud.higgsfield.ai → dashboard → API → create key
export HF_CREDENTIALS="KEY_ID:KEY_SECRET"
```

## Run

```bash
node run.mjs list                 # what will run, no network, no spend
node run.mjs stills --yes         # hero still first, then 4 wardrobe stills from it
#   → review run/stills/*.jpg. Regenerate any of them:
node run.mjs stills --yes --only=hero
#   → or hand-edit stills.json to point at your own image URLs
node run.mjs video --yes          # 9 clips → ../edit/raw/
cd ../edit && ./assemble.sh
```

`--yes` is required for anything that spends credits. Without it the script prints the job
count and exits.

Other flags: `--only=shot3,shot7` to regenerate a subset, `--concurrency=3` (default),
`--model=turbo|standard`.

## How it sequences

The hero still runs **alone and first**. The four wardrobe stills then run in parallel with
the hero passed as `input_images`, so the same two faces carry through. Every shot with a
visible face uses its wardrobe still as the start frame; `shot4a` (penguins, no people) is
the only text-to-video call.

If the hero still fails, the script stops rather than generating four inconsistent casts.

## Endpoints — read this if a call 404s

Paths came from the official Node SDK reference. `docs.higgsfield.ai` was blocked at
authoring time, so **the poll path is a best guess** and the create-response shape is
handled defensively (`id` / `job_set_id` / `jobSetId` / `data.id` all accepted).

Everything is in the `CONFIG` block at the top of `run.mjs`:

```js
soul:   "/v1/text2image/soul",
i2v:    "/v1/image2video/dop",
t2v:    "/v1/text2video/dop",
jobSet: "/v1/job-sets/{id}",     // ← most likely to need correcting
```

Override without editing the file:

```bash
HF_JOBSET_PATH="/v1/job_sets/{id}" node run.mjs video --yes
HF_BASE="https://platform.higgsfield.ai" node run.mjs video --yes
```

None of this has been run against the live API. Do `--only=shot4a` first as a single
cheap call to confirm the endpoints before committing to all nine.

## Editing prompts

`prompts.json` holds every prompt, extracted from `../prompts/02-ad-01-runsheet.md`.
Edit the JSON to iterate — the runsheet stays the human-readable copy of record.
