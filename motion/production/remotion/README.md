# The Cottage★ motion introduction

A 45-second, photo-led introduction to The Cottage★. The film is built around real community memories: the people first, with the SMP as the backyard.

## Compositions

| Composition | Canvas | Frame rate | Duration |
| --- | ---: | ---: | ---: |
| `CottageIntro` | 1920 × 1080 | 120 fps | 45 seconds |
| `CottageIntroPortrait` | 1080 × 1920 | 120 fps | 45 seconds |
| `CottageIntro60` | 1920 × 1080 | 60 fps | 45 seconds |
| `CottageIntroPortrait60` | 1080 × 1920 | 60 fps | 45 seconds |

The 120 fps versions are the high-frame-rate masters. The 60 fps versions are compatibility exports.

## Run locally

Requires Node.js 20+ and npm. From this directory:

```bash
npm install
npm run audio:generate
npm run typecheck
npm run compositions
npm run studio
```

Generate the original soundtrack before rendering. It creates `public/audio/cottage-original-bed.wav` from the source in `scripts/generate-audio.mjs`.

Render the high-frame-rate masters:

```bash
npm run render:landscape
npm run render:portrait
```

Render 60 fps compatibility versions:

```bash
npm run render:landscape:60
npm run render:portrait:60
```

Render storyboard stills:

```bash
npm run render:stills
npm run deliver:prepare
```

Rendered files are written to `out/`, which is ignored by Git. The final preparation step verifies all four MP4s (resolution, frame rate, duration, and embedded AAC audio), copies the original PCM soundtrack into `out/`, creates a 192 kbps MP3 listening copy, checks the audio format and peak level, and writes `out/technical-QA.txt`.

## Media

The project reads photographs from the repository's existing `Media/` directory. It does not make duplicate copies. Each selected image appears once in the sequence. The final end card uses the original `Media/server pfp.jpg`.

The Season 6 backyard and memory sequence includes:

- `far zoom shot of 2 players sitting near a cherry tree s6.png`
- `wide shot of background with 2 players fishing in a brige s6.png`
- `SMP 7.png`
- `SMP 8.png`
- `SMP tiny map.png`

The incomplete `season 6 world wide shot.png` upload is intentionally not referenced.

## Third art-direction pass: a little more magic

The active composition now leans further into a collected, lived-in scrapbook rather than a simple stack of photo cards:

- Fine paper speckling and a warm translucent wash sit behind the photographs.
- Botanical linework, hand-drawn starbursts, tiny archive labels, corner flourishes, and a small scene index make each frame feel like a page in a keepsake book.
- Photos have a second offset paper layer, warmer print treatment, washi tape, archive tabs, and little circular seals.
- Copy panels use a double paper keyline, a faint oversized chapter numeral, a small emblem, a hand-drawn underline, and an editorial italic note.
- The decorative frame is responsive to both 16:9 and 9:16 layouts and stays behind the important photographs and words.

The intention is abundant but calm: details should reward a closer look without turning the film into a busy template or hiding the real memories.

## Motion and finishing

- Larger, more varied scrapbook layouts that use more of the frame.
- Spring-driven photo entrances, gentle floating, and a slow parallax camera.
- Warm paper, olive, and clay colors; tape, captions, stamps, drawn marks, and animated grain.
- 0.3-second scene overlaps with no intentional black-frame gaps.
- Original synthesized instrumental soundtrack generated during CI and included in all four exports.
- The seven-scene sequence is documented in [the production storyboard](../storyboard.md).
- Sound details and review notes are documented in [the audio cue sheet](../audio-cue-sheet.md).

## Automated checks

The CI runner installs FFmpeg/FFprobe and ImageMagick. After rendering nine stills, it creates separate landscape and portrait contact sheets and publishes them as an early-review artifact before the longer MP4 exports begin.


The repository workflow installs the toolchain, generates the original soundtrack, type-checks the source, discovers all four compositions, renders nine storyboard stills, and exports both 120 fps masters plus both 60 fps compatibility versions. The artifact contains the nine PNG stills, four MP4 exports, standalone WAV and MP3 soundtrack files, and `technical-QA.txt`. The downloadable artifact is attached to the successful [Motion intro preview workflow](https://github.com/nxeiv/widget-for-cottage-i-am-so-bored-/actions/workflows/motion-intro-preview.yml).

## Audio deliverables

The workflow packages two standalone versions of the original soundtrack alongside the video files:

- `cottage-original-soundtrack.wav` — 16-bit PCM, 44.1 kHz stereo master.
- `cottage-original-soundtrack.mp3` — 192 kbps, 44.1 kHz stereo listening copy.

Both versions are generated from the same original source script. The MP4 exports also contain the soundtrack as AAC audio. The workflow includes a technical report, but that does not replace a human listening review.

## Production status

- [x] Landscape and portrait compositions at 120 fps
- [x] Landscape and portrait compatibility compositions at 60 fps
- [x] Seven-scene, 45-second structure
- [x] Unique photo assignments with no repeated source images
- [x] Original server icon used on the closing card
- [x] Larger scrapbook layouts, animated photo entrances, expanded paper treatments, botanical flourishes, archive labels, seals, and editorial typography
- [x] Original synthesized instrumental generated and added to the composition
- [x] Render commands and automated workflow
- [x] Run CI: source validation, storyboard renders, and four MP4 export targets
- [x] Package standalone WAV and MP3 soundtrack deliverables and technical QA report
- [ ] Inspect the third-pass generated previews and MP4 exports
- [ ] Review the soundtrack on headphones and phone speakers
- [ ] Approve final photo crops and complete final playback review

The third-pass render is not considered final until CI succeeds and the footage and soundtrack have been reviewed.
