# Website status removal — verification

- [x] Homepage no longer contains a live Minecraft status panel (source checked).
- [x] SMP page no longer contains a live Minecraft status panel (source checked).
- [x] Neither page contains a `cottage-status-api` meta tag.
- [x] Shared JavaScript contains no `fetch` call or timer for `/api/status`.
- [x] Shared CSS contains no unused live-status panel, player-count, uptime, or status-dot styles.
- [x] README and page documentation describe the bridge as removed, not active.
- [x] No reference to `the-cottage-bot.wisp.uno` remains in website source.
- [x] SMP hero, screenshots, feature directory, rules, and Discord links remain intact.
- [x] Homepage community story, gallery, bot information, and Discord widget remain intact.
- [x] No player count, session uptime, or online/offline status is displayed.
- [ ] Page loads without console errors on desktop and mobile (requires browser verification).
