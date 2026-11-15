# SMP Service Online — verification checklist

## Website
- [x] Restore the Service Online card on `smp.html`.
- [x] Poll the read-only status API every 45 seconds.
- [x] Display online state, player count, version, and last-checked time when available.
- [x] Show manual wake instructions only when the Minecraft ping reports unavailable.
- [x] Link to the designated Discord joining message and the Wake Server page.
- [x] Use the exact instruction: “Press the button below and paste it into the Wake Server page.”
- [x] Never render a Minecraft hostname, IP address, or port.
- [x] Hide the wake prompt when the status API itself cannot be reached or the status is stale.
- [x] Preserve responsive styling and reduced-motion behavior from the existing site.

## Deployment checks
- [ ] Deploy the Main Bot status API and confirm `GET /health`.
- [ ] Confirm `GET /api/status` returns only `online`, `state`, `players`, `maxPlayers`, `version`, and `checkedAt`.
- [ ] Confirm the API has CORS configured for `https://the-cottage.onrender.com`.
- [ ] Confirm the public website can fetch the API without console errors.
- [ ] Test an online response, a failed Minecraft ping, a stale response, and an unreachable API.
- [ ] Verify desktop and mobile layouts in a browser.

A failed Minecraft ping is not proof of hibernation. The unavailable state can mean hibernation, a stopped server, a crash, or a network issue.
