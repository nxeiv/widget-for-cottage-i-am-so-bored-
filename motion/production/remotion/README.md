# The Cottage★ motion introduction

A 45-second, photo-led introduction to The Cottage★. The edit is built around real community memories: the people first, with the SMP as the backyard.

## Compositions

| Composition | Canvas | Frame rate | Duration |
| --- | ---: | ---: | ---: |
| `CottageIntro` | 1920 × 1080 | 120 fps | 45 seconds |
| `CottageIntroPortrait` | 1080 × 1920 | 120 fps | 45 seconds |

The 120 fps setting is configured in the Remotion compositions. It still needs a local render and playback check before we can call the exports verified.

## Run locally

From this directory:

```bash
npm install
npm run studio
```

Render the two formats:

```bash
npm run render:landscape
npm run render:portrait
```

Preview still:

```bash
npm run still
```

Rendered files are written to `out/`, which is ignored by Git.

## Media

The project reads photographs from the repository's existing `Media/` directory. No duplicate media folder is needed.

The Season 6 backyard montage currently includes:

- `far zoom shot of 2 players sitting near a cherry tree s6.png`
- `wide shot of background with 2 players fishing in a brige s6.png`
- `SMP 7.png`

The incomplete `season 6 world wide shot.png` upload is intentionally not referenced.

## Current production status

- [x] Landscape and portrait compositions
- [x] Seven-scene, 45-second structure
- [x] Existing community and SMP media references
- [x] Two new Season 6 images added to the backyard scene
- [x] Render commands and output folder documented
- [ ] Install dependencies and run the Remotion preview
- [ ] Type-check and render both formats
- [ ] Review the actual rendered footage and refine timing/crops
- [ ] Add original sound design and music
- [ ] Create scene previews/storyboard deliverables

The source is intentionally kept separate from the live website. No final video is claimed until it has been rendered and reviewed.
