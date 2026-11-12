# The Cottage★ Motion Introduction

This is the active motion-design production workspace, kept inside the website repository so the film and the real Cottage★ media stay together.

## Direction: a little messy, very real

The film should feel like someone made a moving scrapbook out of actual memories — not a polished AI-generated server advert. Real screenshots and artwork lead. Typography and motion support them rather than replacing them.

Visual language:
- Warm paper, soft grain, gentle blur, imperfect framing, and little hand-drawn marks.
- Real moments from the website's `Media/` folder; do not invent people, messages, or memories.
- Natural pacing: let a photo breathe before moving on. Use restrained camera drift, small rotations, crossfades, and occasional quick playful cuts.
- The Cottage★ is the home; the SMP is the backyard. Friendships stay central.

Palette sampled from `cottage.css`:
Paper `#FFFBF3`, cream `#EFE7D7`, ink `#2D2923`, sage `#7F936F`, deep sage `#55644A`, gold `#C9A968`, rose `#C78F82`, taupe `#948979`, muted taupe `#6F665A`.

## Active project

- `remotion/` — React + TypeScript video source.
- `../Media/` — original site photographs, screenshots, art, GIF, and seal. The renderer reads these directly; no duplicate media folder is needed.
- `archive/initial-project/` — preserved first-pass concept and its source files, not the active creative direction.

## Render targets

- Landscape: 1920×1080, 120 FPS, 45 seconds (5,400 frames).
- Portrait: 1080×1920, 120 FPS, 45 seconds (5,400 frames).

120 FPS is the requested render target. It still needs a real local render and quality check; this repository commit does not claim that an MP4 has already been rendered.

## Run

Requirements: Node.js 20+ and npm.

```bash
cd motion/production/remotion
npm install
npm run studio
npm run render:landscape
npm run render:portrait
```

The active project is deliberately separate from the live site's HTML/CSS/JS. No website pages are changed by this motion branch.