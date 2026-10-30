# SemID4Rec — tutorial website

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
| `editions.html`       | Edition archive; not linked from the site while there is only one edition |

Every page shares `assets/css/style.css` (all colors are CSS custom properties at the
top of the file — edit `--theme-color` etc. to re-theme) and `assets/js/site.js`
(light/dark theme toggle that defaults to the system setting + mobile nav).

Content is transcribed from `IDs_That_Mean_Something__...pdf` (the CIKM '26 tutorial
proposal). Still outstanding, marked with `<span class="tbd">TBD</span>` or noted below:

- **Per-section presenter assignments** in the `tutorial.html` schedule table — the
  "Presenter" column shows TBD until the split is decided
- **Slides link** — the "Slides (TBD)" button under the title of `tutorial.html` is
  disabled until the deck is uploaded; replace the `<span class="btn is-disabled">` with
  an `<a class="btn" href="...">Slides</a>` link

## Customize

1. **Photos**: all seven presenters have real headshots in `assets/img/profiles/`
   (`presenter-1` … `presenter-7`, numbered in presenter order). To swap one, overwrite
   the file; square images around 400×400px work best, since they're cropped to a circle
   by CSS. If the file extension changes, update the `src=` in `index.html`,
   `tutorial.html`, and `presenters.html`.
2. **Schedule**: the times in `tutorial.html` follow the official CIKM '26 slot
   (Sat 7 Nov, 14:00–18:30, Aula 7, tea break 16:00–16:30). Replace the TBD cells in the
   "Presenter" column once section-to-presenter assignments are decided.
3. **Presenters**: duplicate a `.person-card` (compact, used on `index.html` /
   `tutorial.html`) or `.bio-card` (full bio, used on `presenters.html`) block for each
   new person; delete a block to remove one.
4. **Reading list** (`papers.html`, labelled "Reading List" in the nav): the list lives in
   [awesome-semantic-id](https://github.com/semantic-id-tutorial/awesome-semantic-id) —
   add papers there, not here. `papers.html` only links to its sections; update the
   topic cards if the repo's section headings (and thus anchors) change.
5. **Editions**: see the checklist below. The nav and footer are identical across all
   five pages, so a change to either must be made in every file (a `sed` across
   `*.html` works, since the markup is the same string on every page).
6. Remove the `.tbd` markers (`<span class="tbd">TBD</span>`) as you fill in the
   remaining real info (presenters, slides link).
7. **Favicon**: swap `assets/img/favicon.svg` for your own icon if you want something
   other than the generic red "T" mark.

## New edition checklist

The nav, footer, homepage hero, and page titles (except `tutorial.html`) are
edition-neutral. Edition-specific details live in these places:

1. **Archive the current edition.** Copy `tutorial.html` to `editions/cikm26.html`
   (fix its relative links to `../`), then in `editions.html` move the CIKM '26 entry
   under "Past editions", give it a badge reading "Past", and link the archived page.
2. **Homepage venue card** (`index.html`, `.venue-card`): swap the logo in
   `assets/img/venues/`, the date / time / room line, the address, and the Directions
   link. Also update the `<meta name="description">` in `index.html`, which names the
   current edition.
3. **`tutorial.html`**: the edition banner, the date / venue line above the schedule,
   the schedule table, the `<title>`, and the citation block and BibTeX if the new
   edition has its own paper.
4. **`editions.html`**: add the new edition as "Current". While there is only one
   edition, nothing links to this page. Once there are two, restore the entry points:
   the "Editions" nav item (after "Presenters") and footer link on every page, an
   Editions card in the homepage "On This Site" grid, and a "See all editions" link in
   the `tutorial.html` banner. `editions.html` itself still has the nav and footer as
   they should look.
5. **README**: update the top-level venue line and the outstanding items above.

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
