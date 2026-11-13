# Production status

## Available in this repository

- [x] Seven editable 1920×1080 landscape SVG scene compositions.
- [x] Seven separate 1080×1920 portrait SVG scene compositions.
- [x] Website palette and 45-second storyboard documented.
- [x] Self-contained animated browser prototype at [preview/index.html](preview/index.html).
- [x] Remotion / React / TypeScript source project at [remotion/](remotion/).
- [x] Two compositions defined at 120 FPS: 1920×1080 landscape and 1080×1920 portrait.
- [x] Render commands and local setup instructions documented.

## Still outstanding

- [ ] Install dependencies and validate the Remotion source with a real build.
- [ ] Render the 1920×1080, 45-second, 120 FPS MP4 master.
- [ ] Render the 1080×1920, 45-second, 120 FPS vertical MP4.
- [ ] Add original or properly licensed music and final sound mix.
- [ ] Review final encodes and package final previews and outputs.

## Important distinction

The browser preview is an animated concept prototype built with HTML, CSS, and inline SVG. It runs locally in a modern browser, but its playback rate follows the browser/display refresh rate and does not guarantee 120 FPS.

The Remotion project is the editable video-rendering source. Its compositions are configured for 5,400 frames at 120 FPS, and the landscape and portrait compositions use their own scene assets. The project has been committed to GitHub but has **not yet been installed, built, or rendered**. No final MP4 files are included yet.

GitHub's normal source viewer displays HTML/TSX as code rather than executing it. Follow the setup in [remotion/README.md](remotion/README.md) to run the project locally.