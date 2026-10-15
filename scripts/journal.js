'use strict';
const fs = require('node:fs');
const path = require('node:path');

// 使用 Fluid 的扩展点，避免修改 node_modules 中的主题源码。
hexo.extend.filter.register('theme_inject', injects => {
  injects.header.file('default', 'customization/header.ejs');
  injects.footer.file('default', 'customization/footer.ejs');
});

hexo.extend.filter.register('before_generate', () => {
  for (const view of ['index', 'layout']) {
    hexo.theme.setView(`${view}.ejs`, fs.readFileSync(path.join(hexo.base_dir, 'customization', `${view}.ejs`), 'utf8'));
  }
});

// Fluid 的核心图标链接写在模板中；将其统一指向随站点分发的字体。
hexo.extend.filter.register('after_render:html', html => html.replaceAll('//at.alicdn.com/t/c/font_1749284_5i9bdhy70f8.css', '/vendor/icons/fluid-icons.css'));
