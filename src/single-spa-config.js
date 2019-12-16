import * as singleSpa from 'single-spa';

const appName = 'app1';

// 按需加载
const loadingFunction = () => import('./app1/app1.js');

// 用应用的名字作为本应用路由的前缀
const activityFunction = location => location.pathname.startsWith('/app1');

singleSpa.registerApplication(appName, loadingFunction, activityFunction);

singleSpa.start();