# The Cottage★ motion introduction

A 45-second, photo-led introduction to The Cottage★. The edit is built around real community memories: the people first, with the SMP as the backyard.

## Compositions

| Composition | Canvas | Frame rate | Duration |
| --- | ---: | ---: | ---: |
| `CottageIntro` | 1920 × 1080 | 120 fps | 45 seconds |
| `CottageIntroPortrait` | 1080 × 1920 | 120 fps | 45 seconds |
| `CottageIntro60` | 1920 × 1080 | 60 fps | 45 seconds |
| `CottageIntroPortrait60` | 1080 × 1920 | 60 fps | 45 seconds |

The 120 fps versions are the high-frame-rate masters. The 60 fps versions are compatibility exports for platforms and players that cap frame rate at 60 fps.

## Run locally

Requires Node.js 20+ and npm. From this directory:

```bash
npm install
npm run typecheck
npm run compositions
npm run studio
```

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
```

Rendered files are written to `out/`, which is ignored by Git.

## Media

The project reads photographs from the repository's existing `Media/` directory. No duplicate media folder is needed.

The Season 6 backyard montage currently includes:

- `far zoom shot of 2 players sitting near a cherry tree s6.png`
- `wide shot of background with 2 players fishing in a brige s6.png`
- `SMP 7.png`

The incomplete `season 6 world wide shot.png` upload is intentionally not referenced.

## Motion and finishing

- 0.3-second crossfades between scenes, with no intentional black-frame gaps
- restrained title rise and fade-in
- gentle camera push and low-amplitude photo drift
- imperfect scrapbook framing, warm paper colors, tape accents, and animated monochrome grain
- the seven-scene sequence is documented in [the production storyboard](../storyboard.md)
- the original sound direction is documented in [the audio cue sheet](../audio-cue-sheet.md)

## Automated checks

The repository workflow installs the toolchain, type-checks the source, discovers the compositions, renders a set of storyboard stills, and exports both 120 fps masters. The workflow uploads the generated stills and MP4s as a GitHub Actions artifact.

## Production status

- [x] Landscape and portrait compositions at 120 fps
- [x] Landscape and portrait compatibility compositions at 60 fps
- [x] Seven-scene, 45-second structure
- [x] Existing community and SMP media references
- [x] Two available Season 6 images integrated into the backyard scene
- [x] Crossfades, text reveal, gentle photo movement, and animated grain
- [x] Render commands and automated workflow
- [ ] Run CI and inspect the generated previews and MP4 exports
- [ ] Review all original photos at full resolution and approve final crops
- [ ] Add original sound design and music
- [ ] Complete final playback and platform compatibility review

No final render is claimed until the automated render succeeds and the footage has been reviewed.
