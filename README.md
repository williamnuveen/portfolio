# William Nuveen — Engineering Portfolio

Live site: https://williamnuveen.github.io/portfolio/

## Editing the site

- **Content and layout:** `src/App.jsx` (projects, experience, stats, skills and so on are near the top)
- **Styles and page `<head>`:** `src/template.html`
- **Photos and the résumé PDF:** the repo root

After editing, rebuild so `index.html` and `assets/app.js` are updated, then commit everything:

```
npm install
npm run build
```

The build pre-renders the page into `index.html`, so the content is visible straight away and readable by search engines, recruiters' tools and link previews. It then hands the page over to React for the interactive parts (filters, popups, galleries). GitHub Pages deploys whatever is on `main` (see `.github/workflows/static.yml`).
