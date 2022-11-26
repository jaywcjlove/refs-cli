Refs CLI
===

<!--rehype:ignore:start-->
[![CI](https://github.com/jaywcjlove/refs-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/refs-cli/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/refs-cli.svg?style=flat)](https://npmjs.org/package/refs-cli)
<!--rehype:ignore:end-->

Command line tool to generate `Quick Reference` website. This is also a tool separated from [`Quick Reference`](https://jaywcjlove.github.io/reference) to help [`Quick Reference`](https://jaywcjlove.github.io/reference) compile and generate HTML websites

<!--rehype:ignore:start-->
[![Quick Reference](https://user-images.githubusercontent.com/1680273/201931931-d8559417-0a15-46af-a009-ec1e56e5b778.png)](https://jaywcjlove.github.io/reference)
<!--rehype:ignore:end-->

## Document

[Reference English](./docs/quickreference.md)<!--rehype:style=background: rgb(92 107 192);&class=contributing&data-info=👆See what's missing?-->   
[Reference 中文](https://jaywcjlove.github.io/reference/docs/quickreference.html)<!--rehype:style=background: rgb(139 170 229);&class=contributing-->   
<!--rehype:class=home-card-->

## Example Show

[Bash](https://jaywcjlove.github.io/reference/docs/bash.html)<!--rehype:style=background: rgb(72 143 223);-->  
[C](https://jaywcjlove.github.io/reference/docs/c.html)<!--rehype:style=background: rgb(92 107 192);-->  
[C#](https://jaywcjlove.github.io/reference/docs/cs.html)<!--rehype:style=background: rgb(6 147 13);&class=contributing-->  
[C++](https://jaywcjlove.github.io/reference/docs/cpp.html)<!--rehype:style=background: rgb(6 147 13);&class=contributing-->  
[Dart](https://jaywcjlove.github.io/reference/docs/dart.html)<!--rehype:style=background: rgb(64 196 255);-->  
[Docker](https://jaywcjlove.github.io/reference/docs/docker.html)<!--rehype:style=background: rgb(72 143 223);-->  
[Dockerfile](https://jaywcjlove.github.io/reference/docs/dockerfile.html)<!--rehype:style=background: rgb(0 72 153);&class=tag&data-lang=Docker-->  
[Django](https://jaywcjlove.github.io/reference/docs/djiango.html)<!--rehype:style=background: rgb(12 75 51);&class=contributing tag&data-lang=Python-->  
[Flutter](https://jaywcjlove.github.io/reference/docs/flutter.html)<!--rehype:style=background: rgb(150 220 254);&class=contributing tag&data-lang=Dart-->  
[Golang](https://jaywcjlove.github.io/reference/docs/golang.html)<!--rehype:style=background: rgb(39 160 193);-->  
<!--rehype:class=home-card-->

<!--rehype:ignore:start-->
## Command Help

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

## Config

Store `.refsrc.json` in the root directory of the project

```json
{
  "title": "Refs CLI",
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
  }
}
```
<!--rehype:ignore:end-->

## Thanks to all contributors
<!--rehype:wrap-style=text-align: center;max-width: 650px;margin: 0 auto;&class=home-title-reset-->

See [Quick Reference](./docs/quickreference.md) for how to get started. As always, thanks to our amazing contributors!
<!--rehype:style=padding-bottom:1rem;-->

<!--GAMFC--><a href="https://github.com/jaywcjlove" title="小弟调调™">
  <img src="https://avatars.githubusercontent.com/u/1680273?v=4" width="42;" alt="小弟调调™"/>
</a><!--GAMFC-END-->

List of contributors, automatically generated by [contributors](https://github.com/jaywcjlove/github-action-contributors)
<!--rehype:style=padding-top:1rem;-->

<!--rehype:ignore:start-->
## License

MIT © [Kenny Wong](https://github.com/jaywcjlove)
<!--rehype:ignore:end-->
