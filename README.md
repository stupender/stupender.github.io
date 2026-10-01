# Stu Pender — Portfolio

Plain HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages.

## The design idea

**Programme** — printed matter, not an app, and printed like the back cover
throughout: cobalt on a cool grey. One typeface (**Host Grotesk**, after the Indoek
Gallery poster), two inks (cobalt for the frame — titles, labels, rules, links,
buttons — and black for reading), sentence case, and colour cards after the
Transient Senses programme:

- **The frame** — one cobalt rule runs down the left edge from the header to the
  footer; each section's name runs up beside it, as on the poster, and a cobalt rule
  crosses the top of each section. On small screens the names lie down over a rule.
- **Type** — seven sizes, one per role (`--t-*` in `styles.css`): *h1* the one big line on a
  page (hero, case-study title, résumé name, "Say hello."); *h2* a section or a project;
  *h3* an item in a list, or a quote; *lede* the paragraph under a title; *body*; *small*
  for secondary notes and section names; *label* for table labels, card numbers, buttons.
- **Full-width lines** — titles and intros run the width of their column instead of
  breaking early; the hero line holds one line on a laptop.
- **Cards** — each selected project is one flat colour card with the same anatomy:
  number and year over a rule, the title (always two lines tall), who it's for, and
  the work rising from the bottom edge in an identical frame (`images/thumbs/`).
  01–04 repeat below as *covers* set straight on the page (no box, no shadow) with
  their contents and a picture of the work.
- **Back** — the case study opens on the card's colour, flat, like the back of the
  card, and ends on the next project's card (01 → 05 → back to 01).
- The colours (`--f-*`) are chosen against each screenshot so the work stands out: cobalt
  (01), saffron (02), terracotta (03), sage (04), khaki (05), slate (11). Cobalt is the one
  dark colour, so its card, case-study header and next card add `.on-dark` for light type.
- **Pairs** — below the header, a case study's summary ("In short") and pull-quote sit on
  a counterpart colour (`--pair`, from `--p-*`), the way the 1971 catalogue pairs an
  orange cover with a khaki one: cobalt/butter, saffron/slate, terracotta/teal, sage/mauve.
- The hero is the statement alone for now; its right-hand column is held for a photo
  (the comment in `index.html` shows where it goes).
- Anything you can press is cobalt and turns black on hover. On a colour card,
  buttons print in black, since cobalt type is too faint there.
- On small screens the menu is a page of its own: solid cobalt, links ruled off and
  numbered like a table of contents.

The site is **one numbered catalogue** on one rail (labels left, content right):
hero and card fronts, covers 01–04, contents 05–11 (kind, title, year, number),
practice, about (a cobalt duotone portrait), and contact.

One link language throughout, with no arrow characters in the markup:
- **Inside the site** (case studies, the résumé, "See all", "Next") — a solid cobalt
  block (`.blk`).
- **Leaves the site** — the same square box, outlined, with the boxed outbound arrow
  from Being Sound.
- **A file to save** — the matching download mark (`a[download]`).

Both marks are drawn as CSS masks, so they look the same on every machine. Nothing
moves on hover, and nothing casts a shadow. Every text colour passes WCAG AA.

## Neutral version (live)

The live site runs the neutral theme: every page sets `data-palette="neutral"` on
`<html>`. It is Being Sound's colours, so the work speaks for itself: a #E0E0E0 ground,
#181818 ink, charcoal cards and case-study tops, stone panels beneath, the back cover a
shade down (#D6D6D6), and coral (#E46B6C on charcoal and in the sun; #9E3C39 on the
grey, where it must pass contrast). Everything described above as cobalt prints in ink.

To return to the colour version (cobalt, saffron, terracotta, sage), remove the
attribute from each page. The link-preview card and résumé PDF are generated from the
neutral pages; regenerate them if you switch.

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
