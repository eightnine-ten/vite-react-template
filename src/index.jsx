import React from 'react';
import './index.css';
import Core from './Core';
import { Pagination } from 'antd';
import { routers } from './router';
import { loginPlugin } from './package/Login';
import { layoutPlugin } from './package/Layout';


const module = {
  routers: [
    {
      path: '/aa',
      component: () => <Pagination defaultCurrent={1} total={50} />
    }
  ]
};

Core.use(module);
Core.plugin(loginPlugin);
Core.plugin(layoutPlugin);

new Core({ routers }).mount('#root');
