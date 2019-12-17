import React from 'react';

import ReactDOM from 'react-dom';

import singleSpaReact from 'single-spa-react';

import Home from './root.component';

// 获取自己的槽
function domElementGetter () {
  return document.querySelector('#home');
}

// 对应三个钩子函数 bootstrap, mount, unmount
const reactLifecycles = singleSpaReact({
  React, ReactDOM, rootComponent: Home, domElementGetter
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];