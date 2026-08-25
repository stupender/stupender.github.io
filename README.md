# Stu Pender — Portfolio

A clean, fast, responsive single-page portfolio. Plain HTML/CSS/JS — no build
step, no framework. Deploys as-is to GitHub Pages.

Visual language is inherited from [Being Sound](https://beingsound.studio):
warm-gray paper, near-black ink, one coral accent, Chivo + Montserrat.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | All content and copy, in clearly-commented sections. |
| `styles.css` | All styling. Colours/fonts/spacing are variables in `:root` at the top. |
| `script.js` | Small progressive-enhancement layer (mobile menu, scroll-reveal, footer year). |
| `images/projects/` | Project screenshots. |
| `images/portrait.jpeg` | The About-section photo. |

## Editing

- **Copy:** edit the text directly in `index.html`. Each project is one
  `<article class="project">` block — copy one to add another. Add the class
  `project--reverse` to put the image on the opposite side.
- **Colours / type / spacing:** the `:root` block at the top of `styles.css`.
- **Swap a screenshot:** drop a new image into `images/projects/` and update the
  `src` in the matching `<article>`.

## Still to add (search `TODO` in `index.html`)

- **Expressionist** — Figma prototype link (only outstanding project asset).
- Optional: a favicon (add `images/favicon.*` and a `<link rel="icon">`).
- **Accordion & Capsule** — Figma mockup/prototype links (the old `pender.co`
  pages are gone and the InVision prototypes were sunset; the visual work lives
  in Figma). Full case-study copy is preserved in the `Bloc Portfolio` repo.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

This site is meant to live at the root `stupender.github.io`. Note the current
git remote here is `single-page-portfolio` — to serve it at the root user URL,
push these files to the **`stupender.github.io`** repo (or point that repo's
Pages setting at this content):

1. Commit the files.
2. Push to the `stupender.github.io` repo's default branch.
3. In that repo: **Settings → Pages → Source: deploy from branch** (root).
4. The site is live at `https://stupender.github.io`.
