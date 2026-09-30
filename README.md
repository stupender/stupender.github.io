# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

The site is **one numbered catalogue**. Every section hangs off the same two-column
grid — a narrow *rail* on the left (labels, numbers, dates) and the content on the
right — so the page reads as one piece rather than a stack of layouts.

- **01–04** are *plates*: the selected projects, each with identical anatomy —
  number and year in the rail, a mat in the project's own colour, name, a
  **For** line (who it's for and the moment they're in), one sentence, the key
  **Decision**, and links.
- **05–11** are the *index*: the same catalogue at list density. Hovering a row on
  desktop shows a small preview.
- Each case study carries its number, its For line, and a **Next** link, so the
  studies read as a sequence (01 → 05 → back to 01).
- Contact is the dark "back cover": the address, documents, elsewhere, and a colophon.

One link language throughout: the primary destination is serif with an accent
underline and →; secondary links are small mono caps, with ↗ when they leave the site.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Hero, the catalogue (plates + index), practice, about, contact. |
| `*-case-study.html`, `fretboard-constellations.html`, … | Case studies 01–05. |
| `archive.html` | No. 11 — experiments and early work. |
| `resume.html` | Résumé; its print styles produce `Stu-Pender-Resume.pdf`. |
| `styles.css` | All styling. Tokens (colour, type, rail width) live in `:root`. |
| `script.js` | Page router (keeps the ambient audio playing), reveal, menu, copy-email, index preview. |

## Editing

- **Add a selected project:** copy an `<article class="plate">`, set its
  `style="--mat:#……"` to a colour from the project itself, and renumber.
- **Add to the index:** copy an `<li>` in `.index-list`; `data-thumb` is the preview image.
- **Résumé PDF:** open `resume.html` and print to PDF (Letter), or regenerate it headlessly.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
