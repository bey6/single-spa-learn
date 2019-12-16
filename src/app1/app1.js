'use strick'

let domEl;

export function bootstrap (props) {
  return Promise.resolve().then(() => {
    domEl = document.createElement('div');
    domEl.id = 'app1';
    document.body.appendChild(domEl);
  })
}

// 装载
export function mount (props) {
  return Promise.resolve().then(() => {
    domEl.textContent = 'App 1 is mounted!'
  })
}

// 卸载
export function unmount (props) {
  return Promise.resolve().then(() => {
    domEl.textContent = '';
  })
}