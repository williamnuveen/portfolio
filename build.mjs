// Builds the site: bundles src/ into assets/app.js and pre-renders the page
// into index.html so the content is visible before JavaScript runs.
// Usage: npm install && npm run build
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const nodePaths = process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : [];
const common = { bundle: true, jsx: 'automatic', loader: { '.jsx': 'jsx' }, nodePaths, logLevel: 'warning' };

// 1. Browser bundle
await build({ ...common, entryPoints: ['src/client.jsx'], outfile: 'assets/app.js', format: 'iife',
  minify: true, target: ['es2019'], define: { 'process.env.NODE_ENV': '"production"' } });

// 2. Pre-render the page to HTML
const ssrFile = path.resolve('.ssr-tmp.cjs');
await build({ ...common, entryPoints: ['src/ssr.jsx'], outfile: ssrFile, format: 'cjs', platform: 'node',
  define: { 'process.env.NODE_ENV': '"production"' } });
const html = createRequire(import.meta.url)(ssrFile).render();
fs.rmSync(ssrFile);

const tpl = fs.readFileSync('src/template.html', 'utf8');
fs.writeFileSync('index.html', tpl.replace('<!--APP-->', html));
console.log(`Built index.html (${(html.length / 1024).toFixed(0)} KB pre-rendered) and assets/app.js (${(fs.statSync('assets/app.js').size / 1024).toFixed(0)} KB)`);
