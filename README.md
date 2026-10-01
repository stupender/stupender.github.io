# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

**Programme** — printed matter, not an app. One typeface (**Host Grotesk**, after the
Indoek Gallery poster), two inks (black and cobalt), cream paper, sentence case, and a
set of cards after the Transient Senses programme:

- **Cards** — each selected project is one flat colour card with the same anatomy:
  number and year over a rule, the title (always two lines tall), who it's for, and
  the work rising from the bottom edge in an identical frame (`images/thumbs/`).
  01–04 repeat below as white *covers* with their contents and a picture of the work.
- **Back** — the case study opens on the card's colour, flat, like the back of the
  card, and ends on the next project's card (01 → 05 → back to 01).
- The colours (`--f-*`) share one lightness and a low chroma, so they read as one set.
- The hero picture is cut paper: a red sun rising behind a cobalt wave (inline SVG).
  The red is used nowhere else.
- Cobalt is the only interaction colour: links and buttons turn cobalt on hover
  (on the cobalt-on-grey back cover, they turn black).
- On small screens the menu is a page of its own: solid cobalt, links ruled off and
  numbered like a table of contents.

The site is **one numbered catalogue** on one rail (labels left, content right):
hero and card fronts, covers 01–04, contents 05–11 (kind, title, year, number),
practice, about (a cobalt duotone portrait), and contact as the back cover.

One link language throughout, with no arrow characters in the markup:
- **Inside the site** (case studies, the résumé, "See all", "Next") — a solid black
  block (`.blk`).
- **Leaves the site** — the same square box, outlined, with the boxed outbound arrow
  from Being Sound.
- **A file to save** — the matching download mark (`a[download]`).

Both marks are drawn as CSS masks, so they look the same on every machine. Nothing
moves on hover. Every text colour passes WCAG AA.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Hero + card fronts, the catalogue (covers + contents), practice, about, contact. |
| `*-case-study.html`, `fretboard-constellations.html`, … | Case studies 01–05. |
| `archive.html` | No. 11 — experiments and early work. |
| `resume.html` | Résumé; its print styles produce `Stu-Pender-Resume.pdf`. |
| `styles.css` | All styling. Tokens (colour, type, rail width) live in `:root`. |
| `script.js` | Page router (keeps the ambient audio playing), scroll reveal, menu, copy-email. |

## Editing

- **Add a selected project:** copy a card in `.cards-list` and an
  `<article class="cover">`, renumber, add a 640px thumbnail to `images/thumbs/`, and
  give the card and its case study's `<article class="cs">` the same
  `style="--field:var(--f-…)"`.
- **Add to the contents:** copy an `<li>` in `.toc`.
- **Résumé PDF:** open `resume.html` and print to PDF (Letter), or regenerate it headlessly.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
