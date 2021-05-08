import React from 'react';
import './index.css';
import './iconfont/iconfont.css';
import Core from './Core';
import { routers } from './router';
import { loginPlugin } from './package/Login';
import { layoutPlugin } from './package/Layout';


const module = {
  routers: [
  ]
};

Core.use(module);
Core.plugin(loginPlugin);
Core.plugin(layoutPlugin);

new Core({ routers }).mount('#root');
