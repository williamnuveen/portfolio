// Builds the site: bundles src/ into assets/app.js and pre-renders the page
// into index.html so the content is visible before JavaScript runs.
// Usage: npm install && npm run build
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const nodePaths = process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : [];
// The contact email comes from the CONTACT_EMAIL environment variable (a GitHub
// repository variable when built by the deploy workflow), never from the code.
// The site's public address. Set the SITE_URL repository variable (for example
// https://williamnuveen.com/) when the site moves to its own domain; every
// canonical link, social preview, sitemap entry and résumé link follows it.
const SITE_URL = (process.env.SITE_URL || 'https://williamnuveen.github.io/portfolio/').replace(/\/?$/, '/');
const define = {
  'process.env.NODE_ENV': '"production"',
  'process.env.CONTACT_EMAIL': JSON.stringify(process.env.CONTACT_EMAIL || ''),
  'process.env.SITE_URL': JSON.stringify(SITE_URL),
};
const common = { bundle: true, jsx: 'automatic', loader: { '.jsx': 'jsx' }, nodePaths, logLevel: 'warning', define };

// 1. Browser bundle
await build({ ...common, entryPoints: ['src/client.jsx'], outfile: 'assets/app.js', format: 'iife',
  minify: true, target: ['es2019'] });

// 2. Pre-render the pages to HTML
const ssrFile = path.resolve('.ssr-tmp.cjs');
await build({ ...common, entryPoints: ['src/ssr.jsx'], outfile: ssrFile, format: 'cjs', platform: 'node' });
const ssr = createRequire(import.meta.url)(ssrFile);
const pages = [
  { out: 'index.html', page: 'home', path: '', html: ssr.renderHome(),
    title: 'William Nuveen – Robotics Engineer',
    description: 'William Nuveen — Senior Robotics Hardware Engineer in San Francisco. Consumables, cartridges and robotics hardware for cell therapy manufacturing.',
    preload: '<link rel="preload" as="image" href="Multiply_Labs_Cluster.jpg">' },
  { out: 'resume.html', page: 'resume', path: 'resume.html', html: ssr.renderResume(),
    title: 'Résumé – William Nuveen',
    description: 'Résumé of William Nuveen, Senior Robotics Hardware Engineer: experience at Multiply Labs, Ocado Technology, Neato Robotics and Kohler, plus education, certifications and skills.',
    preload: '' },
  { out: 'projects/index.html', page: 'projects', path: 'projects/', html: ssr.renderProjects(), base: '../',
    title: 'Projects – William Nuveen',
    description: 'Mechanical design projects by William Nuveen: cell-therapy consumables at Multiply Labs, warehouse robotics at Ocado Technology, robot vacuums at Neato Robotics, and Kohler fixtures.',
    preload: '' },
  ...ssr.portfolioItems.map(p => ({
    out: `projects/${p.slug}/index.html`, page: 'project', slug: p.slug, path: `projects/${p.slug}/`,
    html: ssr.renderProject(p.slug), base: '../../', image: p.image,
    title: `${p.title} – ${p.company} | William Nuveen`,
    description: `${p.shortDescription}. A ${p.company} project by William Nuveen, robotics hardware engineer.`,
    preload: `<link rel="preload" as="image" href="${p.images[0]}">` })),
];
fs.rmSync(ssrFile);

// 3. Fill the shared template for each page. The script URL gets a content hash so
// browsers fetch the new version after every deploy instead of reusing a cached copy.
const hash = (await import('crypto')).createHash('sha1').update(fs.readFileSync('assets/app.js')).digest('hex').slice(0, 10);
const tpl = fs.readFileSync('src/template.html', 'utf8').replace('assets/app.js', `assets/app.js?v=${hash}`);
for (const p of pages) {
  fs.mkdirSync(path.dirname(p.out), { recursive: true });
  const out = tpl.replace('{{BASE}}', p.base ? `<base href="${p.base}">` : '')
    .replaceAll('{{OGIMAGE}}', p.image || 'William_Nuveen_Portrait.jpg').replaceAll('{{SLUG}}', p.slug || '')
    .replaceAll('{{SITE}}', SITE_URL).replaceAll('{{TITLE}}', p.title).replaceAll('{{DESCRIPTION}}', p.description)
    .replaceAll('{{PATH}}', p.path).replaceAll('{{PAGE}}', p.page).replace('{{PRELOAD}}', p.preload)
    .replace('<!--APP-->', p.html);
  fs.writeFileSync(p.out, out);
  console.log(`Built ${p.out} (${(p.html.length / 1024).toFixed(0)} KB pre-rendered)`);
}
console.log(`Built assets/app.js (${(fs.statSync('assets/app.js').size / 1024).toFixed(0)} KB)`);

// Old project addresses that moved: a small page that forwards to the new one.
const MOVED = { 'injection-molded-parts': 'neato-vorwerk-robot-vacuums' };
for (const [from, to] of Object.entries(MOVED)) {
  const url = `${SITE_URL}projects/${to}/`;
  fs.mkdirSync(`projects/${from}`, { recursive: true });
  fs.writeFileSync(`projects/${from}/index.html`, `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Moved</title><link rel="canonical" href="${url}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=../${to}/"></head><body><p>This page moved to <a href="../${to}/">${url}</a>.</p></body></html>\n`);
}

// 4. Search-engine files, built for whatever SITE_URL is.
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
console.log(`Built sitemap.xml and robots.txt for ${SITE_URL}`);
