# The Cottage★ — Remotion source project

This is the editable video-rendering project. It is separate from the browser concept preview in `../preview/index.html`.

## Output compositions

| Composition | Resolution | Frame rate | Duration | Frames |
|---|---:|---:|---:|---:|
| `CottageIntro` | 1920×1080 | 120 FPS | 45 seconds | 5,400 |
| `CottageIntroVertical` | 1080×1920 | 120 FPS | 45 seconds | 5,400 |

The portrait composition uses its own seven portrait SVG layouts. It is not a centre crop of the landscape edition.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
cd remotion
npm install
npm run dev
```

The Remotion Studio opens a local preview where the compositions can be inspected and adjusted.

## Render

```bash
npm run render:landscape
npm run render:vertical
```

The files are written to `remotion/out/`. The composition itself defines 120 FPS and 5,400 frames. Rendering at 120 FPS can take substantially longer and use more memory than a 30 or 60 FPS render.

## Project structure

- `src/Root.tsx` — composition definitions and output dimensions.
- `src/CottageIntro.tsx` — seven-scene timing, transitions, and camera drift.
- `public/scenes/` — editable landscape and portrait SVG scene artwork.

## Current status

This source has been added to GitHub but has **not yet been built or rendered in this environment**. The package configuration and render commands are provided; the MP4 files are not included yet. Review the preview and source before treating this as a final production export.