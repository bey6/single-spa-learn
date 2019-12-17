'use strict'

import { registerApplication, start } from 'single-spa';

registerApplication(
  // 注册的应用的名称
  'home',
  // 加载函数
  () => import('./src/home/home.app'), // <- here
  // 激活函数
  location => location.pathname === '' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/home')
)

start();