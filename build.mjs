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
const define = {
  'process.env.NODE_ENV': '"production"',
  'process.env.CONTACT_EMAIL': JSON.stringify(process.env.CONTACT_EMAIL || ''),
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
    preload: '<link rel="preload" as="image" href="William_Nuveen_Portrait.jpg">' },
  { out: 'resume.html', page: 'resume', path: 'resume.html', html: ssr.renderResume(),
    title: 'Résumé – William Nuveen',
    description: 'Résumé of William Nuveen, Senior Robotics Hardware Engineer: experience at Multiply Labs, Ocado Technology, Neato Robotics and Kohler, plus education, certifications and skills.',
    preload: '' },
];
fs.rmSync(ssrFile);

// 3. Fill the shared template for each page
const tpl = fs.readFileSync('src/template.html', 'utf8');
for (const p of pages) {
  const out = tpl.replaceAll('{{TITLE}}', p.title).replaceAll('{{DESCRIPTION}}', p.description)
    .replaceAll('{{PATH}}', p.path).replaceAll('{{PAGE}}', p.page).replace('{{PRELOAD}}', p.preload)
    .replace('<!--APP-->', p.html);
  fs.writeFileSync(p.out, out);
  console.log(`Built ${p.out} (${(p.html.length / 1024).toFixed(0)} KB pre-rendered)`);
}
console.log(`Built assets/app.js (${(fs.statSync('assets/app.js').size / 1024).toFixed(0)} KB)`);
