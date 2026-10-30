# SemID @ CIKM 2026 — tutorial website

**IDs That Mean Something: A Hands-On Tutorial on Semantic IDs for Recommender Systems**
CIKM '26, November 7–11, 2026, Rome, Italy. https://doi.org/10.1145/3799682.3839274

A plain static HTML/CSS/JS site (no build step, no Jekyll/Ruby) styled after the
[nde-for-ts.github.io](https://nde-for-ts.github.io/) hub layout, with:

- presenter cards shown with photos (like [large-genrec's CIKM 2025 page](https://large-genrec.github.io/cikm2025.html))
- an **Editions** tab (like [agenticrecsys's SIGIR 2026 page](https://agenticrecsys.github.io/sigir2026/)) so
  future editions of the tutorial can be added without restructuring the site
- a Huawei-red accent theme (`--theme-color` in `assets/css/style.css`)

## Pages

| File                  | Purpose                                                              |
| --------------------- | --------------------------------------------------------------------- |
| `index.html`          | Home/About — abstract-level overview + links to every other page      |
| `tutorial.html`       | Learning goals, audience, schedule table, BibTeX citation, all 7 presenters |
| `papers.html`         | Intro to the reading list, with topic links into [awesome-semantic-id](https://github.com/semantic-id-tutorial/awesome-semantic-id) |
| `presenters.html`     | Full bios for all 7 presenters, with photos                           |
| `editions.html`       | Current edition (CIKM '26), plus placeholders for past/upcoming editions |

Every page shares `assets/css/style.css` (all colors are CSS custom properties at the
top of the file — edit `--theme-color` etc. to re-theme) and `assets/js/site.js`
(dark/light/system theme toggle + mobile nav).

Content is transcribed from `IDs_That_Mean_Something__...pdf` (the CIKM '26 tutorial
proposal). Still outstanding, marked with `<span class="tbd">TBD</span>` or noted below:

- **Per-section presenter assignments** in the `tutorial.html` schedule table — the
  "Presenter" column shows TBD until the split is decided
- **Slides link** — the "Slides" entry under Quick Links in `tutorial.html` shows TBD
  until the deck is uploaded
- **Two presenter photos** — Changhong Jin and Yingjie Niu are still placeholder avatar
  icons (`assets/img/profiles/presenter-4.svg`, `presenter-5.svg`); no public homepage
  photo was found for either. The other five (Roger Zhe Li, Aghiles Salah, Mete Sertkan,
  Ruihai Dong, Barry Smyth) are real photos pulled from their personal/institutional
  homepages

## Customize

1. **Photos**: replace `assets/img/profiles/presenter-4.svg` and `presenter-5.svg` with
   real headshots for Changhong Jin and Yingjie Niu (square images around 400×400px work
   best, since they're cropped to a circle by CSS). To swap any other presenter's photo,
   overwrite the existing `presenter-N.jpg`/`.png` file (any format works — just update
   the `src=` extension in `index.html`, `tutorial.html`, and `presenters.html` if it
   changes).
2. **Schedule**: the times in `tutorial.html` follow the official CIKM '26 slot
   (Sat 7 Nov, 14:00–18:30, Aula 7, tea break 16:00–16:30). Replace the TBD cells in the
   "Presenter" column once section-to-presenter assignments are decided.
3. **Presenters**: duplicate a `.person-card` (compact, used on `index.html` /
   `tutorial.html`) or `.bio-card` (full bio, used on `presenters.html`) block for each
   new person; delete a block to remove one.
4. **Papers**: the reading list lives in
   [awesome-semantic-id](https://github.com/semantic-id-tutorial/awesome-semantic-id) —
   add papers there, not here. `papers.html` only links to its sections; update the
   topic cards if the repo's section headings (and thus anchors) change.
5. **Editions**: when this tutorial is accepted at a new venue, add a new
   `.edition-item` block to `editions.html` (an example is left commented out) and
   update the nav — the nav is currently identical across all five pages, so update it
   in each file (a simple `sed` across `*.html` works, since the markup is the same
   string on every page).
6. Remove the `.tbd` markers (`<span class="tbd">TBD</span>`) as you fill in the
   remaining real info (presenters, slides link).
7. **Favicon**: swap `assets/img/favicon.svg` for your own icon if you want something
   other than the generic red "T" mark.

## Preview locally

No build step needed. Either open `index.html` directly in a browser, or serve the
folder so relative links behave exactly like they will on GitHub Pages:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this folder to a repo named `<your-org-or-user>.github.io` (for a user/org
   site) or any repo name (for a project site).
2. In the repo, go to 0 **Settings → Pages**, set **Source** to "Deploy from a branch",
  branch `main`, folder `/ (root)`.
3. Your site will be live at `https://<user-or-org>.github.io/` (or
   `https://<user>.github.io/<repo>/` for a project site — in that case update any
   absolute paths if you add them later; this template only uses relative paths, so it
   works unmodified either way).
