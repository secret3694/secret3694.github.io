---
title: 用 Hexo 和 Fluid，搭建自己的数字花园
date: 2026-10-14 10:00:00
updated: 2026-10-16 09:00:00
categories: [技术手记]
tags: [Hexo, Fluid, GitHub Pages]
description: 从本地预览到命令发布，了解这个博客如何工作。用 Hexo 生成网页，再用一条命令发布到 GitHub Pages。
index_img: /img/mountain.jpg
banner_img: /img/mountain.jpg
demo: true
---

{% note info %}这是可替换的示例教程。下面的命令适用于本项目，内容依据 Hexo 与 Fluid 官方文档整理。{% endnote %}

Hexo 负责把 Markdown 文章变成静态网页，Fluid 负责页面呈现，GitHub Pages 负责托管。三者配合，就能把注意力留给写作。

<!-- more -->

## 本地启动

先安装 Node.js 24 LTS，在博客根目录打开终端：

```bash
npm install -g hexo-cli
npm ci
hexo clean
hexo g
hexo s
```

打开终端提示的 `http://127.0.0.1:4000`，即可查看博客。修改文章后刷新页面就能看到变化。

## 写一篇文章

```bash
hexo new "我的第一篇文章"
```

新文件保存在 `source/_posts/`。文章开头的 Front Matter 用于设置标题、日期、分类、标签和封面：

```yaml
title: 我的第一篇文章
date: 2026-10-15 10:00:00
categories: [技术手记]
tags: [Hexo]
description: 用一句话介绍文章内容。
index_img: /img/mountain.jpg
```

文件名决定文章路径。使用简短的英文文件名，可以获得更稳定、易分享的链接。

## 自定义站点

站点名称、作者与地址在 `_config.yml` 中；主题菜单、封面、配色等在 `_config.fluid.yml` 中。首页扩展放在 `customization/`，样式放在 `source/css/journal.css`。

## 发布到 GitHub Pages

本项目通过 `hexo-deployer-git` 发布。在仓库 **Settings → Pages → Source** 选择 **Deploy from a branch**，分支选择 **gh-pages**，目录选择 **/(root)**。

预览结束后按 Ctrl+C 停止服务，运行：

```bash
hexo g
hexo d
```

`hexo g` 生成网页，`hexo d` 将网页发布到 `gh-pages`。源码保存在 `main` 分支，便于备份和继续写作。网站地址是 `https://secret3694.github.io/`。

参考：[Hexo 官方文档](https://hexo.io/zh-cn/docs/) · [Fluid 官方仓库](https://github.com/fluid-dev/hexo-theme-fluid)
