# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

**Analog Presence** (live): bone paper, warm ink and a burnt-orange accent; Fraunces
for display and intros, Chivo for text, Chivo Mono for numbers, on an eight-step type
scale (`--t-*` in `styles.css`). Every text colour passes WCAG AA.

Each page sets `data-style="analog"` on `<html>`. The stylesheet's base `:root` values
are an alternative, **Gallery** (near-white, ultramarine, Instrument Serif + Sans): to
switch, remove that attribute and load the Instrument fonts instead.

The site is **one numbered catalogue**. Every section hangs off the same two-column
grid — a narrow *rail* on the left (labels, numbers, dates) and the content on the
right — so the page reads as one piece rather than a stack of layouts.

- The hero is the statement plus the first four entries as small matted thumbnails
  (`images/thumbs/`), so real work is visible in the first screen.
- **01–04** are *plates*: the selected projects, each with identical anatomy —
  number and year in the rail, a mat in the project's own colour, name, a
  **For** line (who it's for and the moment they're in), one sentence, the key
  **Decision**, and links.
- **05–11** are the *index*: the same catalogue at list density.
- Each case study carries its number, its For line, and a **Next** link, so the
  studies read as a sequence (01 → 05 → back to 01).
- Contact is the dark "back cover": the address, documents, elsewhere, and a colophon.

One link language throughout, with no arrow characters in the markup:
- **Inside the site** (case studies, the résumé, "See all", "Next") — a solid black
  block (`.blk`) that turns to the accent colour on hover.
- **Leaves the site** — a small-caps label with the boxed outbound arrow from Being Sound.
- **A file to save** — the matching download mark (`a[download]`).

Both marks are drawn as CSS masks, so they look the same on every machine.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Hero, the catalogue (plates + index), practice, about, contact. |
| `*-case-study.html`, `fretboard-constellations.html`, … | Case studies 01–05. |
| `archive.html` | No. 11 — experiments and early work. |
| `resume.html` | Résumé; its print styles produce `Stu-Pender-Resume.pdf`. |
| `styles.css` | All styling. Tokens (colour, type, rail width) live in `:root`. |
| `script.js` | Page router (keeps the ambient audio playing), scroll reveal, menu, copy-email. |

## Editing

- **Add a selected project:** copy an `<article class="plate">`, set its
  `style="--mat:#……"` to a colour from the project itself, and renumber.
- **Add to the index:** copy an `<li>` in `.index-list`.
- **Résumé PDF:** open `resume.html` and print to PDF (Letter), or regenerate it headlessly.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
