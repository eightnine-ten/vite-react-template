import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { flattenDeep } from 'lodash';
import Root from './Root';
import { addPlugin } from './plugin';
import { createBrowserHistory } from 'history';

const modules = [];
let history;
export default class Core {
  constructor(options) {
    let { routers } = options;
    this.routers = routers;
  }

  static plugin = (p) => addPlugin(p);

  static use = (module) => {
    modules.push(module);
  };

  getHistory = () => history;

  getRouters() {
    const moduleRoutes = flattenDeep(modules.map((m) => m.routers)).concat(this.routers);
    return moduleRoutes;
  }

  mount(selector) {
    history = createBrowserHistory({ basename: '/' });
    ReactDOM.render(
      <Root routers={this.getRouters()} core={this} history={history} />,
      document.querySelector(selector)
    );
  }
}
