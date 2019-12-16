# single-spa.js

## 什么是 single-spa.js

**single-spa** 是一个可以把多种 JavaScript 框架所开发的应用聚合在一个应用的前端框架.

它有如下特点:

- 多个SPA的切换无需刷新
- 每个应用独立部署
- 兼容多元框架
- 懒加载

> 这是一个 single-spa 应用的[在线例子](https://single-spa.surge.sh)

从架构上来讲, single-spa 应用由两个部分组成:

- applications
- single-spa-config

### Applications

single-spa apps 会包含众多的 **SPA** 应用, 并且每一个应用都是一个完整的应用, 都可以从 DOM 中装载和卸载自身. 与传统的 **SPA** 相比, single-spa apps 最大的不同是它可以与其他的应用共存, 共享同一个 html page.

如果你的网络还不错, 一定已经打开了[在线例子](https://single-spa.surge.sh). 在元素检视面板可以看到很多 div.

![livedemo](./imgs/1.png)

这些 div 就像插槽一样, 在启动特定的应用时, 在对应的插槽装载元素. 而当应用不在是激活状态时, 又会从 DOM 中卸载掉该应用的元素. 并且, 所有的应用都共享着同一个 html 页.

### single-spa-config

single-spa-config 用于在 single-spa 中注册应用, 每个应用的注册需要如下 3 样东西:

1. application name
2. application load function
3. application active status switch function

## 从零开始

本教程的目标是在结束时, 完成零开始到集成完毕. 它共需要 6 步:

1. 初始化项目
2. 新建 html 文件
3. Registering
4. Create the home application
5. Create the navBar application
6. Create the angularJs application

### 初始化项目

随意新建一个文件夹, 例如 single-spa 作为本此尝试所使用的目录:

#### 0: 初始化目录

```bash
mkdir single-spa && cd single-spa
yarn init              # or npm init
yarn add single-spa    # or npm install --save single-spa
mkdir src
```

#### 1. 安装配置 Babel

```bash
yarn add --dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-object-rest-spread
```

#### 2. 安装配置 Webpack

single-spa 现阶段不得不使用 Webpack, 执行如下命令安装 Webpack, Webpack plugins, loaders.

```bash
# Webpack core
yarn add webpack webpack-dev-server webpack-cli --dev
# Webpack plugins
yarn add clean-webpack-plugin --dev
# Webpack loaders
yarn add style-loader css-loader html-loader babel-loader --dev
```

安装结束之后, 在根目录创建一个 `webpack.config.js` 文件, 贴入如下代码:

```js
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      }, {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};
```

#### 3. 配置 npm run scripts

打开根目录的 `package.json` 文件, 添加如下脚本:

```json
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack --config webpack.config.js -p"
},
```

### 新建 index.html 文件

在根目录新建一个 `index.html` 文件, 内容如下:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>single-spa</title>
</head>

<body>
  <div id="navBar"></div>
  <div id="home"></div>
  <div id="angularJS"></div>

  <script src="/dist/single-spa.config.js"></script>
</body>

</html>
```