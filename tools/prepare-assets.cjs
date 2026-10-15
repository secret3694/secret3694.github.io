'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const files = {
  'hexo-theme-fluid/LICENSE': 'fluid/LICENSE',
  'jquery/dist/jquery.min.js': 'jquery/jquery.min.js',
  'jquery/LICENSE.txt': 'jquery/LICENSE.txt',
  'bootstrap/dist/css/bootstrap.min.css': 'bootstrap/css/bootstrap.min.css',
  'bootstrap/dist/css/bootstrap.min.css.map': 'bootstrap/css/bootstrap.min.css.map',
  'bootstrap/dist/js/bootstrap.bundle.min.js': 'bootstrap/js/bootstrap.min.js',
  'bootstrap/dist/js/bootstrap.bundle.min.js.map': 'bootstrap/js/bootstrap.bundle.min.js.map',
  'bootstrap/LICENSE': 'bootstrap/LICENSE',
  'anchor-js/anchor.min.js': 'anchor/anchor.min.js',
  'anchor-js/LICENSE': 'anchor/LICENSE',
  'tocbot/dist/tocbot.min.js': 'tocbot/tocbot.min.js',
  'tocbot/LICENSE': 'tocbot/LICENSE',
  'clipboard/dist/clipboard.min.js': 'clipboard/clipboard.min.js',
  'clipboard/LICENSE': 'clipboard/LICENSE',
  'github-markdown-css/github-markdown.css': 'github-markdown/github-markdown.min.css',
  'github-markdown-css/license': 'github-markdown/LICENSE',
  'hint.css/hint.min.css': 'hint/hint.min.css',
  'hint.css/LICENSE': 'hint/LICENSE'
};
for (const [from, to] of Object.entries(files)) {
  const target = path.join(root, 'source/vendor', to);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, 'node_modules', from), target);
}
console.log('Local browser assets prepared.');
