'use strict'

import { registerApplication, start } from 'single-spa';

registerApplication(
  // 注册的应用的名称
  'home',
  // 加载函数
  () => import('./src/home/home.app.js'),
  // 激活函数
  location => location.pathname === '' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/home')
)

registerApplication(
  'navBar',
  () => import('./src/navBar/navBar.app.js').then(module => module.navBar),
  () => true
)

function pathPrefix (prefix) {
  return function (location) {
    return location.pathname.startsWith(prefix);
  }
}

registerApplication(
  'angularJS',
  () => import('./src/angularJS/angularJS.app.js'),
  pathPrefix('/angularJS')
)

start();