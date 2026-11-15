# The Cottage★ Website

The public-facing home of **The Cottage★** — an invite-only community built around the people, places, games, conversations, and memories that make the group feel like home.

> **The Cottage★ is the home. The SMP is the backyard.**

This repository contains the standalone website for the Cottage★ community and its Minecraft backyard.

---

## The idea

The website is not designed like a public Minecraft-server listing.

It is designed like a small place on the internet that belongs to an existing group of people:

- personal rather than promotional
- editorial rather than dashboard-heavy
- warm, quiet, and slightly nostalgic
- community-first instead of player-count-first
- visual without becoming busy
- detailed without relying on huge animations

The website should feel like **opening the door to the Cottage**, then walking out into its backyard. The SMP page includes a small live status card; the main community home remains focused on people and friendships.

---

## Pages

| Page | Purpose | Theme |
| --- | --- | --- |
| `index.html` | Main community home | **The Home** — warm, editorial, people-first |
| `smp.html` | Minecraft world | **The Backyard** — darker, cinematic, map/blueprint inspired |
| `gallery.html` | Community image archive | **The Archive** — quiet, visual, gallery-like |
| `404.html` | Wrong-room / missing page | **Wandering** — a small in-universe error state |

### Home

The homepage introduces what The Cottage★ actually is: a private community first, with Discord as the home and Minecraft as one activity inside it.

It includes:

- the community story
- the interactive **One home. A few rooms.** section
- community moments
- the visual archive link
- the Cottage history timeline
- the Cottage★ Bot section
- the SMP/backyard introduction
- Discord join area

### The SMP

The SMP page presents the Minecraft server as the community's backyard rather than the identity of the whole group.

It includes:

- Chapter 1 • Season 6 presentation
- archival screenshots from earlier Cottage★ worlds (Season 6 starts fresh)
- feature directory
- server rules
- cross-platform connection guidance without publishing connection details
- a live Service Online card backed by a private server ping from Main Bot
- Season 6 feature cards for Better Mending, Vein Mining, UltimateTeams, DiscordSRV, and Bedrock skin support
- Discord/home navigation

The hero includes a subtle blueprint/map layer with:

- `HOME`
- `PATH`
- `BACKYARD`
- `C1 / S6`
- `01 — SHARED WORLD`

The map markers are positioned against the actual grid rather than arbitrary percentage coordinates.

Current connection details:
- Java and Bedrock: use the latest connection details in the designated [Discord joining announcement](https://discord.com/channels/1398568016915992667/1478252152169431134/1563549543365222513). The public website repository intentionally contains no server address or port.
- Java joining guide: https://discord.com/channels/1398568016915992667/1478252152169431134/1563549543365222513
- Bedrock joining uses direct server entry only; friends-list invitations are not presented as an alternative.
- Bedrock version support follows the versions supported by Geyser; individual account/client setups may still need staff help.

Current Season 6 feature information includes Better Mending, Vein Mining, the UltimateTeams system, DiscordSRV chat bridging, and installed Floodgate/BedrockSkinRestorer support. Exact plugin behavior depends on the live configuration.


### Gallery

The Gallery is a maintained visual archive rather than a stock-photo showcase.

Current categories:

- **SMP**
- **Moments**

The page supports:

- All / SMP / Moments filters
- natural image proportions
- matching archive frames
- cinematic lightbox viewing
- keyboard navigation
- swipe navigation on touch devices
- captions and image counters

The collection currently contains **8 pieces**.

---

# Visual themes

The site uses one shared design system, but each page has its own mood.

## 01 — The Home

**Warm editorial / lived-in**

The Home theme uses:

- cream and parchment surfaces
- soft sage
- muted gold
- restrained rose accents
- glass-like cards
- paper-like panels
- large editorial typography
- small architectural details

The feeling should be closer to a personal journal, scrapbook, or quietly designed home page than a gaming landing page.

## 02 — The Backyard

**Cinematic / blueprint / shared world**

The SMP theme keeps the same Cottage★ palette but pushes it darker and more spatial.

It uses:

- the real SMP map artwork
- subtle map-grid lines
- compass details
- coordinate-style labels
- season/chapter notation
- darker glass surfaces
- cinematic image treatment

The page should feel like stepping outside the house without leaving the same property.

## 03 — The Archive

**Quiet / visual / preserved**

The Gallery theme treats screenshots and artwork like pieces in a small archive.

Important rules:

- preserve natural image proportions
- keep framing consistent
- avoid aggressive cropping
- let the images carry the personality
- keep controls understated
- make the lightbox cinematic without overwhelming the page

---

# Brand rules

The website follows a few deliberate rules.

### The Cottage★ is the home.

Discord and the wider community come first.

### The SMP is the backyard.

Minecraft is important, but it is an activity within the community rather than the definition of it.

### People before metrics.

Avoid fake member counts, fake activity, or artificial social-proof sections. The SMP status card is a practical service indicator, not a popularity metric. It receives only a sanitized response from Main Bot; never put the Minecraft hostname or port in website HTML, JavaScript, CSS, or documentation.

### Real media over stock media.

Community screenshots, artwork, and actual moments are preferred.

### Details over clutter.

When improving the site, deepen existing components before adding another section.

### Keep the brand quiet.

Core Cottage★ branding avoids decorative emoji and excessive visual noise. Unicode symbols may be used as interface details where appropriate.

The `★` in **The Cottage★** is part of the name and should remain consistent.

---

# Motion system

The website has a shared motion language across all pages.

Current motion includes:

- smooth scrolling
- slow background movement
- ambient orbs
- reveal-on-scroll animations
- subtle card tilt
- restrained parallax
- cinematic image lightbox transitions
- cross-page View Transition API effects
- the small Cottage★ seal / micro-detail animation
- mobile navigation transitions

The motion system is intentionally restrained.

Do **not** reintroduce large cinematic effects, heavy blur, particle systems, mouse trails, sound effects, or animated filler simply for the sake of movement.

### Reduced motion

The site respects:

`prefers-reduced-motion: reduce`

Animations and transitions are reduced or disabled where appropriate.

---

# Main files

| File | Purpose |
| --- | --- |
| `index.html` | Community home |
| `smp.html` | SMP / backyard page |
| `gallery.html` | Visual archive |
| `404.html` | Custom missing-page experience |
| `cottage.css` | Shared visual system and responsive styling |
| `cottage.js` | Shared interactions, motion, lightbox, navigation, and filters |



| `Media/server pfp modified.png` | Tracked server avatar used for the logo / favicon / interface artwork |
| `Media/server gif.gif` | Shared animated background used by the home and SMP pages |
| `Media/` | Screenshots, artwork, maps, and visual archive assets |
| `Media/cottage-seal.svg` | Small line-art Cottage★ micro-detail |

---

# Accessibility and responsive behavior

The site includes:

- keyboard-focus states
- skip links
- labelled mobile navigation
- Escape-to-close interactions
- keyboard-accessible image viewing
- touch/swipe support in the lightbox
- responsive layouts
- reduced-motion support
- semantic labels for interactive regions

The mobile experience is treated as a first-class layout rather than a shrunk desktop page.

---

# Status integration

The SMP page polls Main Bot's read-only status endpoint every 45 seconds. It displays online state, player count, version, and last-checked time. The public API never returns the Minecraft hostname, port, MOTD, player names, or raw connection errors. If a ping fails, the card says **Not responding** rather than assuming the server is sleeping; the manual wake instructions link to the designated Discord joining message and the Wake Server page. The website never submits the server address automatically.

See [the status integration checklist](docs/STATUS_REMOVAL_CHECKLIST.md) for deployment and privacy checks.

---

# Development

The website is plain HTML, CSS, and JavaScript.

There is no frontend framework requirement.

That keeps the site:

- portable
- easy to host
- easy to inspect
- easy to modify
- lightweight compared with a full application stack

The public site can be deployed as a static site on a host that serves the files directly.

---

# Working guidelines

Before adding a new visual feature:

1. Check whether an existing component can be made deeper instead.
2. Keep the three page themes consistent with the Cottage★ identity.
3. Test desktop and mobile layouts.
4. Test keyboard focus and reduced motion.
5. Avoid exposing private community information.
6. Do not publish sensitive screenshots just because they look interesting.
7. Prefer real community details over decorative filler.

The site should always feel like **the same Cottage★**, even when the mood changes between Home, Backyard, and Archive.

---

## Repository

**The Cottage★ Website**

https://github.com/nxeiv/widget-for-cottage-i-am-so-bored-

The public-facing site:

https://the-cottage.onrender.com/
