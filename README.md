# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

**Programme** — printed matter, not an app. One typeface (**Host Grotesk**, after the
Indoek Gallery poster), two inks (black and cobalt), cream paper, sentence case, and a
set of cards after the Transient Senses programme:

- **Front** — each selected project is a white card: a rule, the title, who it's for,
  and its "sound" (a field of thin lines, `wave-mark`) in its colour. The four fronts
  sit under the hero; 01–04 repeat as larger *covers* with their contents and a
  picture of the work.
- **Back** — the case study opens on that colour, flat, like the back of the card,
  and ends on the front of the next project's card (01 → 05 → back to 01).
- The colours (`--f-*`) share one lightness and chroma, so they read as one set.
- The hero picture is cut paper: a cobalt wave breaking round a red sun (inline SVG).
  The red is used nowhere else.
- Cobalt is the only interaction colour: links, blocks and pills turn cobalt on hover
  (on the cobalt-on-grey back cover, they turn black).
- On small screens the menu is a page of its own: solid cobalt, links ruled off and
  numbered like a table of contents.

The site is **one numbered catalogue** on one rail (labels left, content right):
hero and card fronts, covers 01–04, contents 05–11 (kind, title, year, number),
practice, about (a cobalt duotone portrait), and contact as the back cover.

One link language throughout, with no arrow characters in the markup:
- **Inside the site** (case studies, the résumé, "See all", "Next") — a solid black
  block (`.blk`).
- **Leaves the site** — a pill with the boxed outbound arrow from Being Sound.
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
  `<article class="cover">`, renumber, and give its case study's `<article class="cs">`
  `style="--field:var(--f-…)"`. Card fronts carry `style="--field:…"` too, for the
  colour of their sound mark.
- **Add to the contents:** copy an `<li>` in `.toc`.
- **Résumé PDF:** open `resume.html` and print to PDF (Letter), or regenerate it headlessly.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
