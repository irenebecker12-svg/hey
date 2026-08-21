# 99aupairs — Competition Reel

15–20s vertical reel for Instagram Reels + TikTok. Travel-reel energy, competition
mechanic revealed at the end.

**Final spec:** 9:16 · 1080×1920 · 30fps · 18.00s · 120 BPM

## What's here

| File | What it's for |
|---|---|
| `prompts/00-character-bible.md` | The two cast members, locked. Read this before generating anything. |
| `prompts/01-shot-prompts.md` | 9 copy-paste generation prompts, in the order to generate them. |
| `edit/02-timeline.md` | Frame-accurate cut sheet, text schedule, safe zones, audio notes. |
| `edit/captions.ass` | Burn-in caption file, pre-positioned for 1080×1920. |
| `edit/assemble.sh` | ffmpeg assembly of the 12 timeline segments + captions + music. |
| `storyboard/index.html` | Animated 9:16 storyboard — plays the 18s timing with live captions. |

## The order to work in

1. **Read `00-character-bible.md`.** Generate the hero still of Maya + Freya and iterate
   until both faces are right. Everything downstream depends on this one image.
2. Generate the wardrobe stills from the hero still.
3. Run the 9 shots from `01-shot-prompts.md` as image-to-video, in the stated order.
   Generate at 5s each even though most clips only use 2s — you want the handles.
4. Drop the selects into `edit/raw/`, run `assemble.sh`, or use `02-timeline.md` as the
   spec if you'd rather cut in CapCut.

## Two things that will sink this reel

- **Face drift between shots.** Solved only by start-frame image-to-video, never by prompt
  wording. See the character bible.
- **Wrong penguins.** Little penguins are 33cm tall. Any generator that gives you an
  emperor penguin has produced a clip that every Australian viewer will clock instantly.

## What the reel is actually doing

Ten of the eighteen seconds are pure travel content with no mention of au pairing. The
competition mechanic lands at 11s, once the viewer already wants the thing. Childcare is
never the visual subject — the offer is the adventure, and applying or referring is framed
as the entry mechanism, not the ask.
