---
title: 日常 Git 工作流，从一次清晰的提交开始
date: 2026-10-08 11:00:00
updated: 2026-10-15 09:00:00
categories: [技术手记]
tags: [Git, GitHub Pages]
description: 查看改动、组织提交、同步远程。一套适合维护个人博客的简单工作流，让每次更新都有迹可循。
index_img: /img/mountain.jpg
banner_img: /img/mountain.jpg
demo: true
---

{% note info %}这是可替换的示例文章；执行命令前应先确认当前目录与仓库。{% endnote %}

维护博客时，Git 可以帮助我们回答两个问题：这次改了什么，以及为什么改。

<!-- more -->

## 提交前先看一眼

```bash
git status
git diff
```

确认改动都属于这次更新，再将对应文件加入暂存区。个人信息、访问令牌和本地依赖不应提交；本项目已经在忽略文件中排除了常见的本地内容。

## 让一次提交只做一件事

```bash
git add source/_posts/hello-world.md
git commit -m "docs: update welcome post"
git push origin main
```

一篇文章的更新和一套主题样式的修改，可以分别提交。清楚的提交边界让回顾历史更加容易。

## 发布后的检查

推送之后打开仓库的 **Actions** 页面，检查部署工作流是否成功。随后访问博客，确认文章标题、链接和图片显示正常。

如果在多个设备上写作，开始前先同步远程更新；遇到冲突时，逐段理解差异再合并。
