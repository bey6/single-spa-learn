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

## 超简单用法

创建一个 single-app application 只需要 3 步:

**1. 搞一个 html 文件:**

```html

```
