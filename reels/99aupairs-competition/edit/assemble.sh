#!/usr/bin/env bash
# 99aupairs competition reel — assembly
#
# Assembles 9 generated clips into the 18s cut sheet in 02-timeline.md,
# burns the captions, and lays the music underneath.
#
# ffmpeg is NOT installed in the Claude Code web container. Install first:
#   macOS         brew install ffmpeg
#   Debian/Ubuntu sudo apt-get install -y ffmpeg fonts-recommended
#
# Usage:  ./assemble.sh
# Expects, alongside this script:
#   raw/shot1.mp4 raw/shot2a.mp4 raw/shot2b.mp4 raw/shot3.mp4
#   raw/shot4a.mp4 raw/shot4b.mp4 raw/shot5d.mp4 raw/shot6.mp4 raw/shot7.mp4
#   raw/music.mp3      (>= 18s, 120 BPM)

set -euo pipefail
cd "$(dirname "$0")"

RAW=raw
WORK=work
OUT=99aupairs-competition-reel.mp4
mkdir -p "$WORK"

command -v ffmpeg >/dev/null || { echo "ffmpeg not found — see header."; exit 1; }

# Normalise every source to 1080x1920 / 30fps, cover-cropping rather than letterboxing.
norm() { # norm <src> <dest> <start> <duration>
  ffmpeg -y -loglevel error -ss "$3" -t "$4" -i "$1" \
    -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1" \
    -an -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p "$2"
}

# --- cut sheet: <src> <dest> <in-point in source> <duration> -----------------
# In-points assume you keep the best window of each 5s generation. Adjust freely;
# only the DURATIONS must stay exact or the cuts drift off the beat.
norm "$RAW/shot1.mp4"  "$WORK/01.mp4" 0.0 2.0   # 0.00  beach sprint
norm "$RAW/shot2a.mp4" "$WORK/02.mp4" 0.5 2.0   # 2.00  underwater turtle
norm "$RAW/shot2b.mp4" "$WORK/03.mp4" 0.3 1.0   # 4.00  surface scream
norm "$RAW/shot3.mp4"  "$WORK/04.mp4" 0.5 3.0   # 5.00  Sydney Harbour
norm "$RAW/shot4a.mp4" "$WORK/05.mp4" 0.5 1.5   # 8.00  penguins
norm "$RAW/shot4b.mp4" "$WORK/06.mp4" 1.0 1.5   # 9.50  quiet reaction
norm "$RAW/shot2a.mp4" "$WORK/07.mp4" 2.8 0.5   # 11.00 montage turtle
norm "$RAW/shot3.mp4"  "$WORK/08.mp4" 3.8 0.5   # 11.50 montage harbour
norm "$RAW/shot4a.mp4" "$WORK/09.mp4" 2.5 0.5   # 12.00 montage penguins
norm "$RAW/shot5d.mp4" "$WORK/10.mp4" 1.0 0.5   # 12.50 montage lookout
norm "$RAW/shot6.mp4"  "$WORK/11.mp4" 0.5 2.0   # 13.00 best friends
norm "$RAW/shot7.mp4"  "$WORK/12.mp4" 0.0 3.0   # 15.00 clifftop CTA

# --- hard-cut concat ---------------------------------------------------------
: > "$WORK/list.txt"
for f in "$WORK"/[0-1][0-9].mp4; do echo "file '$(basename "$f")'" >> "$WORK/list.txt"; done
ffmpeg -y -loglevel error -f concat -safe 0 -i "$WORK/list.txt" -c copy "$WORK/cut.mp4"

# --- burn captions + mix music ----------------------------------------------
# Emoji caveat: libass renders monochrome unless a colour emoji font is installed
# and named in the .ass styles. If the emoji come out as tofu or flat glyphs, do the
# text pass in CapCut/Premiere using 02-timeline.md as the spec — the timings are the
# deliverable, the .ass file is just one way to apply them.
ffmpeg -y -loglevel error \
  -i "$WORK/cut.mp4" -i "$RAW/music.mp3" \
  -filter_complex "[0:v]subtitles=captions.ass:fontsdir=fonts[v]; \
                   [1:a]atrim=0:18,afade=t=out:st=17.2:d=0.8, \
                        volume=1.0:eval=frame:enable='lt(t,15.6)', \
                        volume=0.71:eval=frame:enable='gte(t,15.6)'[a]" \
  -map "[v]" -map "[a]" -t 18 \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 128k -ar 44100 -movflags +faststart "$OUT"

echo "→ $OUT"
ffprobe -v error -show_entries stream=width,height,r_frame_rate,duration \
        -of default=noprint_wrappers=1 "$OUT"
