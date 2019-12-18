'use strick';

import React from 'react';

import ReactDOM from 'react-dom';

import singleSpaReact from 'single-spa-react';

import NavBar from './root.component.js';

function domElementGetter () {
  return document.querySelector('#navBar');
}

export const navBar = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
  domElementGetter
});