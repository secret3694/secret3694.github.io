# 拾光手记 · secret3694

基于 **Hexo 8 + Fluid 1.9** 的中文个人博客，已配置站点地址 **https://secret3694.github.io/**。该地址是部署目标；完成下方 GitHub 操作后才会上线。

包含山湖首页、文章分类筛选、归档、分类、标签、关于、404、全文搜索、深浅色切换、文章目录、代码高亮与复制、RSS、站点地图。浏览器资源与封面保存在项目中，不需要外部 CDN 才能正常显示。

## 一、在本机预览

安装 [Node.js 24 LTS](https://nodejs.org/)；在本文件所在目录打开终端：

```sh
npm ci
npm start
```

访问 http://127.0.0.1:4000 。按 Ctrl+C 停止。

## 二、发布到你的 github.io

1. 登录 **secret3694** 的 GitHub 账号。
2. 新建 **Public** 仓库，名称必须为 **secret3694.github.io**。不要勾选自动创建 README、License 或 .gitignore。
3. 在当前项目目录运行以下命令（需要已安装 Git）。这是首次初始化的流程；如果已有同名仓库，先合并原有内容再推送，不要强制覆盖。

```sh
git init -b main
git add .
git commit -m "feat: launch Hexo Fluid blog"
git remote add origin https://github.com/secret3694/secret3694.github.io.git
git push -u origin main
```

Git 推送时按 GitHub 提示登录。**不要把密码或访问令牌写进配置文件或聊天中。**

4. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
5. 打开 **Actions → Build and deploy blog** 查看构建结果。若首次推送在设置 Pages 之前失败，可点击 **Re-run all jobs**，或通过 **Run workflow** 重新运行。
6. 工作流成功后访问 **https://secret3694.github.io/**。如果仓库已经启用其他 Pages 发布方式，请先按第 4 步切换。

工作流通过 GitHub 自带的 `GITHUB_TOKEN` 发布，无需新增个人令牌或部署密钥。

也可用 GitHub Desktop：**Add local repository / Create a repository here → Publish repository**，确认仓库名与账号正确，并取消“Keep this code private”；随后仍需设置 Pages 的 Source 为 GitHub Actions。GitHub 网页上传可能遗漏 `.github` 等隐藏目录，建议使用 Git 或 GitHub Desktop。

## 三、写文章

```sh
npm run new -- "我的第一篇文章"
```

编辑 `source/_posts/` 中的新文件。推荐把文件名改成短英文，因为文件名会用作文章网址：

```yaml
---
title: 我的第一篇文章
date: 2026-10-16 10:00:00
updated: 2026-10-16 10:00:00
categories: [技术手记]
tags: [Hexo, 随笔]
description: 这里是首页文章卡片中的简介。
index_img: /img/mountain.jpg
banner_img: /img/mountain.jpg
---

在这里写正文。
```

首页每页展示 9 篇文章；分类按钮筛选**当前页**，完整分类通过导航“分类”访问。文章中的分类和标签会自动生成索引页。未来日期的文章暂不发布，时间使用 Asia/Shanghai。

当前 6 篇文章全部标记了 `demo: true`，正文也注明为示例。可以删除它们，或改成自己的内容并去掉 `demo` 和正文提示。修改关于页 `source/about/index.md`，再将更新提交到 `main`，后续会自动发布。

## 四、常见修改

| 想改什么 | 文件 |
| --- | --- |
| 网站名称、作者、网站地址 | `_config.yml` |
| 导航、Fluid 功能、主题配色 | `_config.fluid.yml` |
| 关于我的内容 | `source/about/index.md` |
| 首页与侧栏的文字布局 | `customization/index.ejs` |
| 首页封面标题 | `customization/header.ejs` |
| 页脚文案 | `customization/footer.ejs` |
| 博客头像 | `_config.fluid.yml` 中的 `about.avatar`，当前图片为 `source/img/github-avatar.png` |
| 网站图标 | `source/img/favicon.svg` |
| 样式与分类交互 | `source/css/journal.css`、`source/js/journal.js` |

替换封面时，建议把压缩后的 JPG/WebP 放入 `source/img/`。首页大图用 `hero-lake.jpg`；文章封面可在 Front Matter 独立设置。首页文字与 Fluid 主题配置相互独立。

评论默认关闭。若需要评论，可按 [Fluid 配置文档](https://fluid.ist/docs/guide/) 配置 Waline 或 Giscus；不要把服务端密钥放入网页。

## 五、构建与检查

```sh
npm run clean
npm run build
npm run check
```

生成结果在 `public/`。检查覆盖生成页面、站内链接、图片和样式资源，以及搜索索引条目。`public/` 与 `node_modules/` 不提交；GitHub Actions 从锁定的依赖生成网站。

`scripts/journal.js` 通过 Fluid 扩展点加载自定义首页与布局，没有修改 npm 主题源码。`tools/prepare-assets.cjs` 在构建和启动时整理本地浏览器依赖。更新依赖后应重新生成并预览。

## 来源与许可

- [Hexo 官方中文文档](https://hexo.io/zh-cn/) · [Fluid 官方仓库](https://github.com/fluid-dev/hexo-theme-fluid)
- 第三方资源与封面来源见 `ASSET-LICENSES.md`。主题和依赖保留各自的开源许可。
- 所有示例文章可自行修改；生活随笔为演示内容，不代表作者真实经历。
