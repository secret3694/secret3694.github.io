(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.story-card')];
  const count = document.getElementById('visible-count');
  const empty = document.querySelector('.filter-empty');
  for (const button of filters) {
    button.addEventListener('click', () => {
      const chosen = button.dataset.filter;
      let visible = 0;
      for (const card of cards) {
        const show = chosen === 'all' || JSON.parse(card.dataset.categories).includes(chosen);
        card.hidden = !show;
        if (show) visible++;
      }
      for (const filter of filters) {
        const active = filter === button;
        filter.classList.toggle('active', active);
        filter.setAttribute('aria-pressed', String(active));
      }
      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible > 0;
    });
  }
  const current = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('#navbar .nav-link[href]').forEach(link => {
    const path = new URL(link.href, location.origin).pathname.replace(/\/$/, '') || '/';
    if (path === current || (path !== '/' && current.startsWith(path + '/'))) link.setAttribute('aria-current', 'page');
  });
  document.querySelector('#search-btn a')?.setAttribute('aria-label', '搜索文章');
  document.querySelector('#mobile-search-btn a')?.setAttribute('aria-label', '搜索文章');
  document.querySelector('#color-toggle-btn a')?.setAttribute('aria-label', '切换深浅色主题');
  document.querySelector('#mobile-color-toggle-btn a')?.setAttribute('aria-label', '切换深浅色主题');
  document.querySelector('#navbar-toggler-btn')?.setAttribute('aria-label', '打开导航菜单');
  document.querySelector('#local-search-close')?.setAttribute('aria-label', '关闭搜索');
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-label', '复制代码');
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });
  document.addEventListener('keydown', event => {
    const field = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable;
    if (event.key === '/' && !field && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const trigger = document.querySelector('#search-btn a');
      if (trigger) { event.preventDefault(); trigger.click(); }
    }
  });
  if (window.jQuery) {
    window.jQuery('#modalSearch').on('shown.bs.modal', () => document.querySelector('#local-search-input')?.focus());
  }
})();
