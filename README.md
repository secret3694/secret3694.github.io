# 拾光手记 · secret3694

使用 **Hexo 8 + Fluid 1.9** 的中文个人博客，网址：**https://secret3694.github.io/**。

按 Hexo 官方方式使用 `hexo clean`、`hexo g`、`hexo s`、`hexo d` 管理博客。`main` 保存源码，`gh-pages` 保存生成的静态网页。首页基于 Fluid 扩展点定制，文章页使用 Fluid。

## 一、首次准备

需要 [Node.js 24 LTS](https://nodejs.org/) 和 [Git](https://git-scm.com/)。仅第一次安装全局命令：

```sh
npm install -g hexo-cli
```

取得源码并安装依赖：

```sh
git clone https://github.com/secret3694/secret3694.github.io.git
cd secret3694.github.io
npm ci
```

已有项目的用户，先保存本机修改，再在项目目录运行 `git pull --ff-only origin main` 和 `npm ci`，取得这次调整。使用 ZIP 的用户应下载最新源码包。

## 二、日常预览与发布

在包含 `_config.yml` 和 `package.json` 的博客根目录执行：

```sh
hexo clean
hexo g
hexo s
```

访问 **http://127.0.0.1:4000/**。检查完成后，在终端按 **Ctrl+C** 停止预览，再执行：

```sh
hexo d
```

`hexo d` 将本机 `public/` 中的网页推送至 `gh-pages`，GitHub Pages 随后更新网站。修改文章后先重新运行 `hexo g`，再执行 `hexo d`；也可使用 `hexo g -d` 连续生成并发布。

| 命令 | 作用 |
| --- | --- |
| `hexo clean` | 清理生成文件和缓存 |
| `hexo g` | 生成静态网页到 `public/` |
| `hexo s` | 在本机预览博客 |
| `hexo d` | 发布已生成的网页 |

第一次发布时，按 GitHub / Git Credential Manager 提示登录 **secret3694**。无需把令牌写进配置文件。PowerShell 若拦截脚本，可使用 Windows 启动器，例如 `hexo.cmd g`，或使用命令提示符。

如果电脑使用网络代理，而 Git 提示无法连接 GitHub，可在代理软件中启用终端代理，或设置当前终端的 `HTTPS_PROXY`。本机现有代理地址为 `http://127.0.0.1:7890`，可在 PowerShell 中执行以下命令后，再运行 `git pull` 或 `hexo d`：

```powershell
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

这只影响当前终端；换电脑时应使用那台电脑的实际代理地址。GitHub 可直接访问时无需设置。

## 三、GitHub Pages 设置

本仓库配置为：

- **Settings → Pages → Build and deployment → Source**：**Deploy from a branch**。
- **Branch**：**gh-pages**，目录为 **/(root)**。
- 仓库默认分支仍为 **main**。

`_config.yml` 的发布配置：

```yaml
deploy:
  type: git
  repo: https://github.com/secret3694/secret3694.github.io.git
  branch: gh-pages
  ignore_hidden: false
```

`gh-pages` 仅保存生成结果。Hexo 的 Git 发布插件会更新该分支，文章和配置应保存在源码分支。

仓库中的 **Check blog** 工作流只检查构建与链接。源码推送到 `main` 用于备份，实际发布通过 `hexo d` 完成。GitHub Pages 会显示系统自带的部署记录，可在 **Actions** 或 **Settings → Pages** 查看。

## 四、写文章并备份源码

```sh
hexo new "我的第一篇文章"
```

编辑 `source/_posts/` 中的文件。推荐使用简短英文文件名，因为文件名用于文章网址：

```yaml
---
title: 我的第一篇文章
date: 2026-10-16 10:00:00
updated: 2026-10-16 10:00:00
categories: [技术手记]
tags: [Hexo, 随笔]
description: 这里是首页卡片中的简介。
index_img: /img/mountain.jpg
banner_img: /img/mountain.jpg
---

在这里写正文。
```

发布网站后，也建议备份源码：

```sh
git add .
git commit -m "docs: update blog content"
git push origin main
```

依赖、生成结果和部署缓存已加入 `.gitignore`。在另一台电脑写作时，从 `main` 取回源码即可。

当前 6 篇文章是 `demo: true` 的示例，可以删除，或替换成自己的内容并去掉示例标记。未来日期的文章暂不发布，时间使用 Asia/Shanghai。

## 五、常见修改

| 想改什么 | 文件 |
| --- | --- |
| 网站名称、作者、网址、发布分支 | `_config.yml` |
| 导航、Fluid 功能、配色、头像地址 | `_config.fluid.yml` |
| 关于我的内容 | `source/about/index.md` |
| 首页与侧栏布局 | `customization/index.ejs` |
| 首页封面标题 | `customization/header.ejs` |
| 页脚文案 | `customization/footer.ejs` |
| 头像图片 | `source/img/github-avatar.png`，当前 GitHub 头像的本地副本 |
| 网站图标 | `source/img/favicon.svg` |
| 样式与分类交互 | `source/css/journal.css`、`source/js/journal.js` |

封面可放入 `source/img/`，在文章 Front Matter 中设置。评论默认关闭，可按 Fluid 文档配置。

## 六、检查与项目说明

```sh
hexo clean
hexo g
npm run check
```

检查覆盖页面、站内链接、本地资源与搜索索引。兼容保留的 `npm run build`、`npm start`、`npm run deploy` 也会调用同一套 Hexo 命令。

主题通过 npm 安装。`scripts/journal.js` 在 Hexo 初始化时准备本地浏览器资源，通过 Fluid 扩展点加载首页定制，并生成 `.nojekyll` 文件。没有修改 npm 主题源码。

参考：[Hexo 中文文档](https://hexo.io/zh-cn/) · [Hexo 一键部署](https://hexo.io/zh-cn/docs/one-command-deployment) · [Fluid 官方仓库](https://github.com/fluid-dev/hexo-theme-fluid)。

资源来源与许可见 `ASSET-LICENSES.md`。
