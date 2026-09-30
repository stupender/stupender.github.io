# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

**Programme** — printed matter, not an app. The page borrows from a 1971 exhibition
catalogue (lowercase grotesk, hairline rules, a table of contents), flat colour event
cards (a serif title on one colour each), a surf-shop panel (pill tags), a 1959
film-festival poster (cut-paper waves and a red sun, spaced serif capitals) and a
one-colour gallery poster (cobalt only, type up the edge, a duotone photograph).

- Paper and ink for the frame; **cobalt** as a second printing ink; **terracotta** for
  anything you touch. Every text colour passes WCAG AA (tokens in `styles.css`).
- **Archivo** sets the frame in lowercase; **Newsreader** sets project titles and
  quotes; labels are spaced serif capitals. Eight-step type scale (`--t-*`).
- Each selected project owns one flat colour, `--field`, used for its card in the
  hero, its cover in the work section and its case-study header.

The site is **one numbered catalogue**, hung off one rail (labels left, content right):

- The hero is the statement beside a cut-paper picture (`art` is inline SVG), then
  the programme: four colour cards, one per selected project.
- **01–04** are *covers*: number and year over a hairline, a serif title, the **For**
  line (who it's for, mid-what), then the project's contents — What, Decision, Role,
  Stack — with labels right-aligned, as in a table of contents.
- **05–11** are the *contents*: kind, title, year, number.
- Each case study opens on its cover colour and ends on the next project's colour
  (01 → 05 → back to 01).
- Contact is the back cover, printed in cobalt on grey, with a line of type up the edge.

One link language throughout, with no arrow characters in the markup:
- **Inside the site** (case studies, the résumé, "See all", "Next") — a solid ink
  block (`.blk`) that turns terracotta on hover.
- **Leaves the site** — a pill (or label) with the boxed outbound arrow from Being Sound.
- **A file to save** — the matching download mark (`a[download]`).

Both marks are drawn as CSS masks, so they look the same on every machine. Nothing
moves on hover.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Hero + programme cards, the catalogue (covers + contents), practice, about, contact. |
| `*-case-study.html`, `fretboard-constellations.html`, … | Case studies 01–05. |
| `archive.html` | No. 11 — experiments and early work. |
| `resume.html` | Résumé; its print styles produce `Stu-Pender-Resume.pdf`. |
| `styles.css` | All styling. Tokens (colour, type, rail width) live in `:root`. |
| `script.js` | Page router (keeps the ambient audio playing), scroll reveal, menu, copy-email. |

## Editing

- **Add a selected project:** copy an `<article class="cover">` and its card in
  `.cards-list`; give both `style="--field:var(--f-…)"` (or a new field token that
  passes contrast with ink), and renumber.
- **Add to the contents:** copy an `<li>` in `.toc`.
- **Résumé PDF:** open `resume.html` and print to PDF (Letter), or regenerate it headlessly.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
