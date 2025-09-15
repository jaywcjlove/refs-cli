Quick Reference Cheatsheet
===

[![CI](https://github.com/jaywcjlove/refs-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/refs-cli/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/refs-cli.svg?style=flat)](https://www.npmjs.com/package/refs-cli)
[![Downloads](https://img.shields.io/npm/dm/refs-cli.svg?style=flat)](https://www.npmjs.com/package/refs-cli)
[![Repo Dependents](https://badgen.net/github/dependents-repo/jaywcjlove/refs-cli)](https://github.com/jaywcjlove/refs-cli/network/dependents)
[![Github repo](https://badgen.net/badge/icon/Github?icon=github&label)](https://github.com/jaywcjlove/refs-cli)

Here's a style reference you can use on your **Quick Reference** cheat sheet!
<!--rehype:style=padding-top: 12px;-->

Getting Started
---


### Local compilation preview

Clone the repository to the local debug page. See the [Contributing Guide](https://github.com/jaywcjlove/reference/blob/main/CONTRIBUTING.md) for how to get started.

#### Clone repository

```shell
git clone git@github.com:jaywcjlove/reference.git
```
<!--rehype:className=wrap-text -->

#### Install dependencies to generate HTML pages

```shell
npm i         # install dependencies
npm run build # Compile output HTML
```

The HTML is stored in the `dist` directory under the root directory of the warehouse, and the `dist/index.html` static page is opened in the browser for preview.

```shell
# Listen to the md file to compile and output HTML
npm run start
```

### Directory Structure

```bash
.
├── CONTRIBUTING.md   # Contribution Note
├── Dockerfile
├── LICENSE
├── README.md  # 🌐 Home content
├── dist # 📦 Compiled static resource directory
├── docs # 👈 Markdown Documentation (cheatsheet)
│   ├── bash.md
│   ├── ....
│   └── yaml.md
├── package.json
├── .refsrc.json # refs configuration
└── assets  # LOGO icon file resource
```

### Add a checklist

A simple checklist contains `page headline <h1>`, `introduction` text placed below the headline, `<h2>` category headings, `<h3>` content for `cards`

```markdown
Cheatsheet (page title)
===

Here's a style reference you can use on your current listing! Cheat Sheet Introduction

Getting Started (Category Title)
---

### Introduction (card)

card content
```
<!--rehype:className=wrap-text-->

The above markdown content is stored in the `docs` directory, named `xxx.md`

### Home Navigation
<!--rehype:wrap-class=col-span-2-->

The homepage (`README.md`) is stored in the root directory of the warehouse, and the homepage navigation is automatically generated through this `README.md`. The following is a navigation example:

```markdown
## Linux commands

[Cron](./docs/cron.md)<!--rehype:style=background: rgb(239 68 68/var(\-\-bg\-opacity));-->
<!--rehype:class=home-card-->
```

The home navigation icon is stored in the `scripts/assets` directory. If your cheat list is defined as `docs/cron.md`, then your icon is defined as `cron.svg` and stored in the `scripts/assets` directory , recompile the home page when the row menu has icons.

- Icons are stored in the [`scripts/assets`](https://github.com/jaywcjlove/reference/blob/main/scripts/assets) directory
- The name of the image is consistent with the name of the manifest `cron.md` -> `cron.svg` (note capitalization)
- SVG icon size `<svg height="1em" width="1em"`
- SVG icon color uses inherited color value `<svg fill="currentColor"`
- Use `<!--rehype:class=home-card-->` to identify the card style

### Home prompt configuration

```markdown
[Django](./docs/djiango.md)<!--rehype:style=background: rgb(12 75 51/var(\-\-bg\-opacity));&class=contributing-->
```
<!--rehype:className=wrap-text-->

Add `contributing` class name, it will add `👆needs your participation to be perfected` by default at the bottom of the card

```markdown
class=tag&data-info=👆See what's missing?
```

The above example changes the default prompt to:`👆See what's missing?`

```markdown
[Django](./docs/djiango.md)<!--rehype:style=background: rgb(12 75 51/var(\-\-bg\-opacity));&class=tag&data-lang=Python-->
```
<!--rehype:className=wrap-text-->

Add `class=tag&data-lang=Python` class name and parameters, it will be marked _`Python`_ in the upper right corner of the card

### Command Help

```bash
Usage: refs-cli [output-dir] [--help|h]

  Displays help information.

Options:

  --version, -v   Show version number
  --help, -h      Displays help information.
  --watch, -w     Watch and compile Markdown files.
  --output, -o    Output directory. defalut(dist)
  --force, -f     Force file regeneration.

Example:

  $ npx refs-cli
  $ refs-cli --watch
  $ refs-cli --output website
  $ refs-cli

refs-cli@v0.0.1
```

### Config

Store `.refsrc.json` in the root directory of the project

```json
{
  "title": "Quick Reference",
  "description": "{{description}}. Sharing Quick Reference Cheat Sheets for Developers",
  "keywords": "reference-cli,reference,refs-cli,refs,cli",
  "data-info": "👆👆need your participation",
  "search": {
    "label": "Search",
    "placeholder": "Search for cheatsheet",
    "cancel": "Cancel"
  },
  "editor": {
    "label": "Edit"
  },
  "github": {
    "url": "https://github.com/jaywcjlove/refs-cli"
  },
  "home": {
    "label": "Home",
    "url": "https://jaywcjlove.github.io/refs-cli"
  },
  "footer": "<br />备案号：<a href=\"#\">沪ICP备202200000号-1</a>",
  "license": "Support for HTML strings",
  "analyticsId": "G-9MWEWXSDQK"
}
```

Support [JSON](https://www.json.org), [JSONC](https://github.com/microsoft/node-jsonc-parser), [JSON5](https://json5.org/), [YAML](https://yaml.org/), [TOML](https://toml.io), [INI](https://en.wikipedia.org/wiki/INI_file), [CJS](http://www.commonjs.org), [Typescript](https://www.typescriptlang.org/), and ESM config load.

### `TOML` config example:

```toml
title = "Refs CLI"
description = "{{description}}. Sharing Quick Reference Cheat Sheets for Developers"
keywords = "reference-cli,reference,refs-cli,refs,cli"
data-info = "👆👆need your participation"
[search]
  label = "Search"
  placeholder = "Search for cheatsheet"
  cancel = "Cancel"

[editor]
  label = "Edit"
[github]
  url = "https://github.com/jaywcjlove/refs-cli"
[home]
  label = "Home"
  url = "https://jaywcjlove.github.io/refs-cli"
```

### Support for more config loading

```bash
.refsrc                .refsrc.json
.refsrc.json5          .refsrc.jsonc
.refsrc.yaml           .refsrc.yml
.refsrc.toml           .refsrc.ini
.refsrc.js             .refsrc.ts
.refsrc.cjs            .refsrc.mjs
.config/refsrc         .config/refsrc.json
.config/refsrc.json5   .config/refsrc.jsonc
.config/refsrc.yaml    .config/refsrc.yml
.config/refsrc.toml    .config/refsrc.ini
.config/refsrc.js      .config/refsrc.ts
.config/refsrc.cjs     .config/refsrc.mjs
refs.config.js         refs.config.ts
refs.config.cjs        refs.config.mjs
```

### Environment Variable

Custom navigation menu

```ini
REF_URL=http://ref.ecdata.cn/
REF_LABEL=网站首页
```

Footer added (Support for HTML strings)

```ini
REF_FOOTER= <br/>备案号：沪ICP备20220000000号-1
```
<!--rehype:className=wrap-text-->

Modify copyright information (HTML strings are supported)

```ini
LICENSE=Copyright (c) <b>2022</b> Support for HTML strings
```
<!--rehype:className=wrap-text-->

Create `.env` file in project root directory.

### Image

![](./quickreference.svg?#sss=1)

<img src="./quickreference.svg?#sss=1" height="95" width="95" />

<hr />

```markdown
![](./quickreference.svg?#sss=1)

<img
  src="./quickreference.svg?#sss=1"
  height="95"
  width="95"
/>
```

在 Markdown 中引入图片

Markdown Comments Syntax
---

### Introduce
<!--rehype:wrap-class=row-span-2-->

The `HTML comment syntax` is used in the cheat list to identify the website layout and some styles, the purpose is to preview normally and flawlessly in `GitHub` [`Markdown`](./markdown.md).

```markdown
### Card Title
<!--rehype:wrap-class=col-span-2-->

Card Markdown content display, the following comment syntax changes the style for the text content
<!--rehype:style=color: red;-->
```
<!--rehype:className=wrap-text-->

The basic example above uses the `col-span-2` class logo, and the card occupies the `2` column position. It is a good habit to refer to the source code of the existing cheat list!

### An introduction to annotation syntax
<!--rehype:wrap-class=row-span-4&style=color:black;background-color: #d7a100;-->

- Add HTML comments below or after a [`Markdown`](./markdown.md) syntax
- Start with `<!--rehype:`, end with `-->`, wrap the parameter content
- The content adopts the character splicing method of the URL parameter

#### Syntax

`<!--rehype:` _+_ `key=value` _+_ **`&`** _+_ `key=value` _+_ `-->`  
`Mark Start` + `parameter:value` + `Delimiter(&)` + `parameter:value`  + `Mark End`

#### Example

```markdown
## Section H2
<!--rehype:body-class=cols-2-->

### Section H3
<!--rehype:wrap-class=row-span-2-->
```

#### Example, three placeholders, title red

```markdown
### Title
<!--rehype:wrap-class=row-span-3&style=color:red;-->
```
<!--rehype:className=wrap-text-->

#### Parameter Description

className | description
---- | ----
`body-style` | Wraps all card `Warpper` styles
`body-class` | For card bar layout, add `class` name
`wrap-style` | Add [CSS](./css.md) style to card bar
`wrap-class` | For card placeholder, add `class` name
<!--rehype:className=left-align show-header-->

### Text Color

```markdown
_I am red_<!--rehype:style=color: red;-->
**bold red**<!--rehype:style=color: red;-->
```

Add a comment style above, the text _I am red_<!--rehype:style=color: red;--> the text becomes `red`

### Font Size

```markdown
**bold red**
<!--rehype:style=color: red;font-size: 18px-->
```
<!--rehype:className=wrap-text-->

Add a comment style above, the text _bold becomes bigger red_<!--rehype:style=color: red;font-size: 18px--> becomes `red` and `big`

### Forced line break

```markdown
\```js
function () {}
\```
<!--rehype:className=wrap-text-->
```

If the content of the code block is too long, use the forced line break class (`wrap-text`) to solve

### Show table header

```markdown
Key   | value
:---- | --
`Key` | value
<!--rehype:className=show-header-->
```

The annotation configuration adds the `show-header` class, placed under the table, the header will be displayed.

### Code line highlighting
<!--rehype:wrap-class=row-span-2-->

```jsx {1,4-5}
import React from "react";
import "./Student.css";

export const Student = (
  <div className="Student"></div>
);
```

The lines above `{1,4-5}` are highlighted, and the following is [`Markdown`](./markdown.md) code example

```markdown
  ```jsx {1,4-5}
```

Code line highlighting can be used together with code line numbers.

### Tooltips

> [When the mouse moves over it, there is a hint](https://github.com/jaywcjlove/reference) _Tip content of Tooltips_<!--rehype:tooltips-->

Add annotation configuration `<!--rehype:tooltips-->` to add a Tooltips hint.

### H3 section (card) background color
<!--rehype:wrap-style=background: #8dffd42e;-->

```markdown
### H3 section (card) background color
<!--rehype:wrap-style=background: #8dffd42e;-->
```
<!--rehype:className=wrap-text -->

### Red title
<!--rehype:style=background:#e91e63;-->

```markdown
### Red title
<!--rehype:style=background:#e91e63;-->
```

Add a style annotation `<!--rehype:style=background:#e91e63;-->` below the H3 heading

### Shortcut key style

| Key | value |
| ---- | ---- |
| `Shortcuts` | directions |
| `Shortcuts` | directions |
<!--rehype:className=shortcuts-->

Add the `<!--rehype:className=shortcuts-->` style class to the list to display the shortcut key style.

Key | value
:---- | ----
 directions | `Shortcuts` |
 directions | `Shortcuts` |
<!--rehype:className=shortcuts-last-->

Add the `<!--rehype:className=shortcuts-last-->` style class to the list to display the shortcut key style.

### Code line number

```jsx showLineNumbers
export const Student = <div>Student</div>;
const school = <div>School</div>;
```

Here is a `Markdown` code example

```markdown
  ```jsx showLineNumbers
```

Add the `showLineNumbers` flag after the markup language

### Built-in class style

:- | -
:- | -
`shortcuts` | shortcut key style
`wrap-text` | beyond newline
`show-header` | display header
`style-none` | Hide `<ul>` list styles
`style-list` | `<table>` cell row display
<!--rehype:className=shortcuts-->

### Color Element

:- | -
:- | -
`<yel>` | <yel>Yellow</yel>
`<red>` | <yel>Red</yel>
`<pur>` | <pur>Purple</pur>
`<code>` Or <code>\`\`</code> | <code>Green</code>`Color`
`<del>` Or `~~delete~~` | <del>~~Red Color~~</del>
<!--rehype:className=shortcuts-->

### HTML code preview

```
  ```html preview
  <b>Here is your HTML code</b>
  \```
```

---

```html preview
<b>Here is your HTML code</b>
```

The above [`markdown`](./markdown.md) code adds the `preview` flag in the `meta` position, and the [HTML](./html.md) code will be executed to preview

### Hide card title
<!--rehype:style=display:none;&wrap-style=padding-top: 0;-->

```
Hide card title, add comment style below H3 title
```
<!--rehype:className=wrap-text-->

```markdown {2}
### Hide card title
<!--rehype:style=display:none;&wrap-style=padding-top: 0;-->
```
<!--rehype:className=wrap-text -->

### 注释类配置
<!--rehype:wrap-class=col-span-2-->

类 | 说明
---- | ----
`<!--rehype:className=wrap-text-->` | 强制`换行`
`<!--rehype:className=show-header-->` | 展示表格`表头`
`<!--rehype:className=shortcuts-->` | 表首列`快捷键`样式
`<!--rehype:className=shortcuts-last-->` | 表尾列`快捷键`样式
`<!--rehype:className=auto-wrap-->` | 隐藏表头强制小尺寸`自动换行`
`<!--rehype:className=style-list-arrow-->` | 列表`箭头`样式展示表格
`<!--rehype:className=style-list-->` | `列表`样式展示表格
`<!--rehype:className=left-align-->` | 表格末尾列`左对齐`
`<!--rehype:className=style-none-->` | \<li> 没有标记样式
`<!--rehype:className=style-timeline-->` | `时间轴`样式
`<!--rehype:className=style-arrow-->` | `箭头`标记

### KaTeX 数学渲染

```KaTeX
c = \pm\sqrt{a^2 + b^2}
L = \frac{1}{2} \rho v^2 S C_L
```

上面示例 [`Markdown`](./markdown.md) 代码源码

```markdown {1}
  ```KaTeX
  c = \pm\sqrt{a^2 + b^2}
  L = \frac{1}{2} \rho v^2 S C_L
```

还可以单行展示 `KaTeX:c = \pm\sqrt{a^2 + b^2}`，需要标记 <code>\`KaTeX:数学公式\`</code> 将被显示成数学公式，这是基于 [KaTeX](https://katex.org/) 生成

布局
---

### H2 部分
<!--rehype:wrap-class=row-span-2-->

```markdown
H2 部分
---

### 卡片 1 (H3 部分)
### 卡片 2 (H3 部分)
### 卡片 3 (H3 部分)
```

上面实例 `H2 部分` 标题下面有三个`卡片`，默认 `3` 栏布局。

```markdown {3}
H2 部分
---
<!--rehype:body-class=cols-2-->
### 卡片 1 (H3 部分)
### 卡片 2 (H3 部分)
### 卡片 3 (H3 部分)
```

使用注释配置为 H2 部分 添加 `col-span-2` 类，将 ~~`3`~~ 栏布局变成 `2` 栏布局。

类 | 说明
---- | ----
`cols-1` | `1` 栏卡片布局
`cols-2` | `2` 栏卡片布局
`cols-3` | `3` 栏卡片布局
`cols-4` | `4` 栏卡片布局
`cols-5` | `5` 栏卡片布局
`cols-{1~6}` | `1~6` 栏卡片布局
<!--rehype:className=show-header -->

### 占位布局 style 写法

```markdown {2}
### H3 部分
<!--rehype:wrap-style=grid-row: span 2/span 2;-->
```
<!--rehype:className=wrap-text -->

放在 `### H3 部分` 下面的注释配置，与 `<!--rehype:wrap-class=row-span-2-->` 相同，设置 2 行占位布局。

### 卡片栏布局 style 写法

```markdown {2}
## H2 部分
<!--rehype:body-style=grid-template-columns: repeat(2,minmax(0,1fr));-->
```
<!--rehype:className=wrap-text -->

放在 `## H2 部分` 下面的注释配置，与 `<!--rehype:body-class=cols-2-->` 相同，设置 2 栏布局。

### H3 部分

```markdown {2,4}
### 卡片 1 (H3 部分)
<!--rehype:wrap-class=row-span-2-->
### 卡片 2 (H3 部分)
<!--rehype:wrap-class=col-span-3-->
### 卡片 3 (H3 部分)
```

---

:-- | --
:-- | --
合并 **列** 布局 |
`col-span-2` | `2` 列占位
`col-span-3` | `3` 列占位
`col-span-4` | `4` 列占位
`col-span-{2~10}` | `{2~10}` 列占位
合并 **行** 布局 |
`row-span-2` | `2` 行占位
`row-span-3` | `3` 行占位
`row-span-4` | `4` 行占位
`row-span-{2~10}` | `{2~10}` 行占位

### 卡片合并行布局 1

```shell
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
┆   H3 Title 1  ┆
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 2 ┆ ┆ 3 ┆ ┆ 4 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### H3 Title 1
<!--rehype:wrap-class=col-span-3-->
### Title 2

### Title 3

### Title 4
```

第一标题添加 `col-span-3` 占位类

### 卡片列合并布局 2

```shell
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 1 ┆ ┆ 2 ┆ ┆ 3 ┆
┆   ┆ ╰┈┈┈╯ ╰┈┈┈╯
┆   ┆ ╭┈┈┈╮ ╭┈┈┈╮
┆   ┆ ┆ 4 ┆ ┆ 5 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
<!--rehype:wrap-class=row-span-2-->
### Title 2
### Title 3
### Title 4
### Title 5
```

在 `Title 1` 标题添加 `row-span-2` 占位类

### 卡片列合并布局 3

```shell
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 1 ┆ ┆ 2 ┆ ┆ 3 ┆
╰┈┈┈╯ ┆   ┆ ╰┈┈┈╯
╭┈┈┈╮ ┆   ┆ ╭┈┈┈╮
┆ 4 ┆ ┆   ┆ ┆ 5 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 Markdown 源码：

```markdown
### Title 1
### Title 2
<!--rehype:wrap-class=row-span-2-->
### Title 3
### Title 4
### Title 5
```

在 `Title 2` 标题添加 `row-span-2` 占位类

### 卡片列合并布局 4

```shell
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 1 ┆ ┆ 2 ┆ ┆ 3 ┆
╰┈┈┈╯ ╰┈┈┈╯ ┆   ┆
╭┈┈┈╮ ╭┈┈┈╮ ┆   ┆
┆ 4 ┆ ┆ 5 ┆ ┆   ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
### Title 2
### Title 3
<!--rehype:wrap-class=row-span-2-->
### Title 4
### Title 5
```

在 `Title 3` 标题添加 `row-span-2` 占位类

### 卡片列合并布局 5

```shell
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 1 ┆ ┆ 2 ┆ ┆ 3 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯ 
╭┈┈┈╮ ╭┈┈┈┈┈┈┈┈┈╮
┆ 4 ┆ ┆ 5       ┆
╰┈┈┈╯ ╰┈┈┈┈┈┈┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
### Title 2
### Title 3
### Title 4
### Title 5
<!--rehype:wrap-class=col-span-2-->
```

在 `Title 5` 标题添加 `col-span-2` 占位类

### 卡片列合并布局 6

```shell
╭┈┈┈╮ ╭┈┈┈┈┈┈┈┈┈╮
┆ 1 ┆ ┆ 2       ┆
╰┈┈┈╯ ╰┈┈┈┈┈┈┈┈┈╯
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 3 ┆ ┆ 4 ┆ ┆ 5 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
### Title 2
<!--rehype:wrap-class=col-span-2-->
### Title 3
### Title 4
### Title 5
```

在 `Title 2` 标题添加 `col-span-2` 占位类

### 卡片列合并布局 7

```shell
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 1 ┆ ┆ 2 ┆ ┆ 3 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
╭┈┈┈┈┈┈┈┈┈╮ ╭┈┈┈╮
┆ 4       ┆ ┆ 5 ┆
╰┈┈┈┈┈┈┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
### Title 2
### Title 3
### Title 4
<!--rehype:wrap-class=col-span-2-->
### Title 5
```

在 `Title 4` 标题添加 `col-span-2` 占位类

### 卡片列合并布局 8

```shell
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
┆     H3 Title 1      ┆
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 2 ┆ ┆ 3 ┆ ┆ 4 ┆ ┆ 5 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
H2 部分
----
<!--rehype:body-class=cols-4-->
### Title 1
<!--rehype:wrap-class=col-span-4-->
### Title 2
### Title 3
### Title 4
### Title 5
```

在 `H2 部分` 标题添加 `cols-4`，和 `Title 1` 添加 `col-span-4` 合并栏

### 卡片列合并布局 9
<!--rehype:wrap-class=col-span-2-->

```shell
╭┈┈┈┈┈┈┈┈┈╮ ╭┈┈┈╮
┆ 1       ┆ ┆ 2 ┆
┆         ┆ ╰┈┈┈╯
┆         ┆ ╭┈┈┈╮
┆         ┆ ┆ 3 ┆
╰┈┈┈┈┈┈┈┈┈╯ ╰┈┈┈╯
╭┈┈┈╮ ╭┈┈┈╮ ╭┈┈┈╮
┆ 4 ┆ ┆ 5 ┆ ┆ 6 ┆
╰┈┈┈╯ ╰┈┈┈╯ ╰┈┈┈╯
```

上面布局效果 [Markdown](./markdown.md) 源码：

```markdown
### Title 1
<!--rehype:wrap-class=col-span-2 row-span-2-->
### Title 2
### Title 3
### Title 4
### Title 5
### Title 6
```

在 `Title 1` 标题添加 `col-span-2` 和 `row-span-2` 占位类，使用 `空格` 间隔。

表格
---

### 基本表格

#### Date

:- | :-
:- | :-
`%m/%d/%Y` | 06/05/2013
`%A, %B %e, %Y` | Sunday, June 5, 2013
`%b %e %a` | Jun 5 Sun

#### Time

:- | :-
:- | :-
`%H:%M` | 23:05
`%I:%M %p` | 11:05 PM

标题为 `H4` 的基本表格。

### 快捷键

:- | :-
:- | :-
`V` | Vector
`P` | Pencil
`T` | Text
`L` | Line
`R` | Rectangle
`O` | Oval
`U` | Rounded
<!--rehype:className=shortcuts-->

### 展示标题

| Prefix | Example | What |
| ---- | ---- | ---- |
`//` | `//hr[@class='edge']` | Anywhere
`./` | `./a` | Relative
`/` | `/html/body/div` | Root
<!--rehype:className=show-header-->

`<!--rehype:className=show-header-->`

### 列表样式展示表格

:- | :-
:- | :-
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-->

`<!--rehype:className=style-list-->`

### 列表圆圈样式展示表格

:- | :- 
:- | :- 
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-arrow circle-->

添加 `style-list-arrow` 和 `circle` 样式

### 列表实心圆圈样式展示表格

:- | :- 
:- | :- 
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-arrow circlefill-->

添加 `style-list-arrow` 和 `circlefill` 样式

### 列表方形展示表格

:- | :- 
:- | :- 
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-arrow square-->

添加 `style-list-arrow` 和 `square` 样式

### 列表实心方形展示表格

:- | :- 
:- | :- 
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-arrow squarefill-->

添加 `style-list-arrow` 和 `squarefill` 样式

### 列表箭头样式展示表格

:- | :-
:- | :-
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=style-list-arrow-->

`<!--rehype:className=style-list-arrow-->`

### 隐藏表头强制小尺寸自动换行

:- | :-
:- | :-
`visualEffectState.inactive` | 后台应一直显示为非激活状态。
`titleBarStyle` _string_ _(win/mac)_ | 窗口标题栏样式。默认值 _(default)_
`titleBarStyle.default` | 分别返回 _mac_ 或者 _win_ 的标准标题栏
<!--rehype:className=auto-wrap-->

`<!--rehype:className=auto-wrap-->`

### 表格末尾列左对齐

| Prefix | What |
| ---- | ---- |
`//`  | Anywhere
`./`  | Relative
<!--rehype:className=show-header left-align-->

默认表格末尾列`右对齐`，添加 `<!--rehype:className=left-align-->` 类让其`左对齐`

### 强制 code 不换行

| Command | Description |
| ---- | ---- |
| `adb remount`                     | Remounts file system with read/write access |
| `adb reboot bootloader`           | Reboots the device into fastboot            |
<!--rehype:className=show-header code-nowrap-->

添加 `<!--rehype:className=code-nowrap-->` 注释

列表
---

### 一栏(默认)

- Item 1
- Item 2
- Item 3

### 四列

- Item 1
- Item 2
- Item 3
- Item 4
- Item 5
- Item 6
- Item 7
- Item 8
<!--rehype:className=cols-4-->

`<!--rehype:className=cols-4-->`

### 列表步骤
<!--rehype:wrap-class=row-span-2-->

- **重命名为 new_name**

  ```bash
  $ git branch -m <new_name>
  ```

- 推送和**重置**

  ```bash
  $ git push origin -u <new_name>
  ```

- 删除远程分支

  ```bash
  $ git push origin --delete <old>
  ```
<!--rehype:className=style-timeline-->

`<!--rehype:className=style-timeline-->`

### 没有标记

- Item 1
- Item 2
- Item 3
- Item 4
- Item 5
- Item 6
- Item 7
- Item 8
- Item 9
<!--rehype:className=cols-3 style-none-->

`<!--rehype:className=cols-3 style-none-->`

### 圆圈标记

- Item 1
- Item 2
- Item 3
<!--rehype:className=style-round-->

`<!--rehype:className=style-round-->`

### 箭头标记

- Item 1
- Item 2
- Item 3
<!--rehype:className=style-arrow-->

`<!--rehype:className=style-arrow-->`

H2 部分 - 5列效果展示
---
<!--rehype:body-class=cols-5-->

### One
<!--rehype:wrap-style=background:#dba300;-->

```
...
```

### Two

```
...
```

### Three

```
...
```

### Four

```
...
```

### Five

```
...
```

H3 部分 - 占位效果展示
---

### row-span-2
<!--rehype:wrap-class=row-span-2-->

```
...合并两行
```

`<!--rehype:wrap-class=row-span-2-->`

### col-span-2
<!--rehype:wrap-class=col-span-2-->

```
...合并两列
```

`<!--rehype:wrap-class=col-span-2-->`

### 红色标题
<!--rehype:style=background:#e91e63;-->

```
...红色标题配置
```

`<!--rehype:style=background:#e91e63;-->`

### 黄色标题
<!--rehype:style=background:#d7a100;-->

```
...黄色标题配置
```

`<!--rehype:style=background:#d7a100;-->`

### col-span-3
<!--rehype:wrap-class=col-span-3-->

```
...
```

### Card child

Each section can have the following subitems:

#### H4 subheading

- pre
- table
- ul

#### H4 subheading

- pre
- table
- ul

### H3 部分

每个盒子(卡片)都是一个 `H3` 部分。 盒子将包含 `H3` 自身内的所有东西。

这是一个包含段落的基本部分。

### H3 部分背景颜色
<!--rehype:wrap-style=background: #1b5064;-->

```markdown
注释配置：
`<!--rehype:wrap-style=background: #1b5064;-->`
```
<!--rehype:className=wrap-text -->

另见
---

- [首页](../README.md)