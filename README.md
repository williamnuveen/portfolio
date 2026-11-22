# William Nuveen — Engineering Portfolio

Live site: https://williamnuveen.github.io/portfolio/

## Editing the site

- **Content and layout:** `src/App.jsx` (projects, experience, timeline, stats, skills and so on are near the top)
- **Résumé page:** `src/Resume.jsx` (summary, education, certifications). Job bullets come from `careerPages` in `src/App.jsx`.
- **Styles and page `<head>`:** `src/template.html`
- **Photos and the résumé PDF:** the repo root

Push to `main` and GitHub builds and deploys the site automatically (see `.github/workflows/static.yml`). The built files (`index.html`, `resume.html`, `assets/app.js`) are generated during the deploy and are not stored in the repo.

## Contact email

The email address is not stored in the code. The deploy reads it from a GitHub repository variable named `CONTACT_EMAIL` (Settings → Secrets and variables → Actions → Variables). If the variable is missing, the email links are left off the site.

## Previewing locally

```
npm install
CONTACT_EMAIL=you@example.com npm run build
python3 -m http.server
```
