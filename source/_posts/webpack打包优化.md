---
layout: webpack打包优化
title: webpack打包优化
date: 2021-05-20 18:44:15
tags: webpack, 打包, 优化
---

# webpack 打包优化

影响前端发布速度的有两个方面，一个是构建，一个就是压缩，把这两个东西优化起来，可以减少很多发布的时间。

- ## 优化构建速度

  1.使用高版本的 webpack
  webpack4 新版本的优化使用 v8 引擎，v8 带来的优化包括

  ```
  for of 替代 forEach
  Map和Set 替代Object
  includes 替代 indexOf()
  默认使用更快的md4 hash算法 替代 md5算法，md4较md5速度更快
  webpack AST 可以直接从loader传递给AST，从而减少解析时间
  使用字符串方法替代正则表达式
  更高版本的node.js对原生js api和js数据结构做出进一步的优化
  ```

  2.多线程 # happypack:
  在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的任务要一个一个进行操作。
  Happypack 的作用就是将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。所以可以大大提升 Webpack 的项目构件速度 1. 引入 2. 将 loader 换成 happypack 的 loader 3. 创建 happypack 插件 thread-loader
  开启多线程打包，这个 loader 之前执行的 loader 就会在一个单独的 worker 池(worker pool)中运行 loader 的执行顺序是从下到上，从右到左 3.缩小打包作用域：
  exclude/include (确定 loader 规则范围)
  resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
  resolve.extensions 尽可能减少后缀尝试的可能性
  noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
  IgnorePlugin (完全排除模块)
  合理使用 alias 4.充分利用缓存提升二次构建速度：
  babel-loader 开启缓存
  terser-webpack-plugin 开启缓存
  使用 cache-loader 或者 hard-source-webpack-plugin
  注意：thread-loader 和 cache-loader 两个要一起使用的話，先放 cache-loader 接著是 thread-loader 最后才是 heavy-loader
  5.DLL：
  使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

* ## 优化打包体积

  压缩代码
  进行多线程压缩
  1.urglifyjs-weboack-plugin
  2.terser-webpack-plugin

  提取页面公共资源
  使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
  Tree shaking
  purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(建议)
  图片压缩
  image-webpack-loader
