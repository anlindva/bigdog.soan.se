# BigDog — Fjällvilla i Idre

Marketing/rental site for our cabin at Canis Majorvägen 6, Idre.

**Live (preview):** https://bigdog.soan.se (password: `bigdog2026`)

## Stack

Pure static site — HTML + CSS + vanilla JS. Hosted on GitHub Pages with custom domain via Loopia DNS (CNAME → `anlindva.github.io`).

## Before going live

### Content to fill in
- [ ] **Pricing** — replace `— kr` placeholders in `index.html` (lines ~159-174)
- [ ] **Booked dates** — add date ranges to the `BOOKINGS` array in `js/calendar.js`
- [ ] **Replace gallery-7.jpg** — current interior shot still has people in background (used in hero slideshow). Take a new clean photo of the living room.

### Remove preview gate
Delete the password protection by removing these lines:
- `<script src="js/gate.js"></script>` from `index.html`
- `<script src="js/gate.js"></script>` from `galleri.html`
- Optionally delete `js/gate.js`

### Enable HTTPS
After DNS is confirmed working:
```bash
gh api repos/anlindva/bigdog.soan.se/pages -X PUT \
  -f "source[branch]=master" -f "source[path]=/" \
  -F "https_enforced=true"
```

## Photo management

- Original HEIC files are in `pictures/` (gitignored)
- Converted JPGs go in `pictures/jpg/` (gitignored, working copies)
- Site-ready images are named `gallery-N.jpg`, `hero.jpg`, `exterior.jpg` in `pictures/`
- To convert new photos: `cd pictures && sips -s format jpeg -s formatOptions 85 IMG_XXXX.HEIC --out jpg/IMG_XXXX.jpg --resampleWidth 1920`

## File overview

| File | Purpose |
|---|---|
| `index.html` | Main landing page (hero slideshow, features, about, gallery preview, calendar, pricing, contact) |
| `galleri.html` | Full gallery with lightbox (27 photos) |
| `css/style.css` | All styles — dark timber aesthetic, Lora + Raleway fonts |
| `js/main.js` | Header scroll, mobile nav, hero slideshow (6s interval), lightbox |
| `js/calendar.js` | Static availability calendar — edit `BOOKINGS` array to update |
| `js/gate.js` | Preview password gate (remove before going live) |
| `logo.svg` | Badge logo (shield with mountains, cabin, "BigDog" banner) |
| `CNAME` | GitHub Pages custom domain config |

## Design

- Inspired by [Forsgrens Timmerhus](https://forsgrenstimmerhus.se/) — dark timber, moody aesthetic
- Colors: charcoal (#1A1714) background, warm white (#F0EBE5) text, burnt orange (#C4652E) accents
- Fonts: Lora (headings), Raleway (body)
- Hero: full-screen slideshow cycling between house exterior, interior, and winter view
