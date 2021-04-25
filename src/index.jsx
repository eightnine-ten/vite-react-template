import React from 'react';
import './index.css';
import Core from './Core';
import avatar from './avatar.png';

console.log(avatar);

const modules = [
  {
    path: '/aa',
    component: () => <div>aa<img alt="img" style={{ height: 100, width: 100 }} src={avatar} /></div>
  },
  {
    path: '/bb',
    component: () => <div>bb</div>
  }
];

const modules2 = [
  {
    path: '/cc',
    component: () => <div>cc</div>
  }
];

const plugin = {
  pluginName: 'login',
  getLoginComponent: (opt) =>  {
    console.log(opt);
    return <div>login</div>
  }
}

Core.use(modules);
Core.use(modules2);

Core.plugin(plugin);

const locale = {
  en_US: {
    locale: 'en-us',
    aaa: 123
  },
  zh_CN: {
    locale: 'zh-cn',
    aaa: 1235
  }
};

new Core({ locale }).mount('#root');
