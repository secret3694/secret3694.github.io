'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '../public');
const origin = 'https://secret3694.github.io';
const errors = [];
let checked = 0;
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
assert.ok(fs.existsSync(root), 'Build the site first: npm run build');
const files = walk(root);
function verifyLink(value, file) {
  if (!value || /^(data:|mailto:|tel:|javascript:|#)/i.test(value)) return;
  let url;
  const relative = path.relative(root, file).split(path.sep).join('/');
  try { url = new URL(value.replaceAll('&amp;', '&'), `${origin}/${relative}`); } catch { errors.push(`${relative}: invalid URL ${value}`); return; }
  if (url.origin !== origin) {
    if (/\.(js|css|woff2?|ttf|png|jpe?g|webp|gif)(\?|$)/i.test(url.pathname)) errors.push(`${relative}: external runtime asset ${url.href}`);
    return;
  }
  checked++;
  const target = path.join(root, decodeURIComponent(url.pathname));
  if (!fs.existsSync(target) || (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, 'index.html')))) errors.push(`${relative}: missing ${url.pathname}`);
}
for (const file of files.filter(file => /\.(html|css)$/.test(file))) {
  const content = fs.readFileSync(file, 'utf8');
  const expression = file.endsWith('.html') ? /(?:href|src)\s*=\s*["']([^"']+)["']/g : /url\(\s*["']?([^\s"')]+)["']?\s*\)/g;
  for (const match of content.matchAll(expression)) verifyLink(match[1], file);
}
for (const required of ['index.html', 'about/index.html', 'archives/index.html', 'categories/index.html', 'tags/index.html', '404.html', 'local-search.xml', 'atom.xml', 'sitemap.xml', 'robots.txt']) {
  if (!fs.existsSync(path.join(root, required))) errors.push(`Missing required page: ${required}`);
}
const posts = files.filter(file => file.includes(`${path.sep}posts${path.sep}`) && file.endsWith('index.html'));
assert.ok(posts.length >= 1, 'No published posts');
const search = fs.readFileSync(path.join(root, 'local-search.xml'), 'utf8');
const entries = (search.match(/<entry>/g) || []).length;
if (entries !== posts.length) errors.push(`Search entries ${entries} do not match published posts ${posts.length}`);
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (!home.includes('https://secret3694.github.io/')) errors.push('Missing correct canonical site URL');
fs.writeFileSync(path.join(root, '.nojekyll'), '');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`PASS: ${files.filter(f => f.endsWith('.html')).length} pages, ${posts.length} posts, ${entries} search entries, ${checked} local links and assets.`);
