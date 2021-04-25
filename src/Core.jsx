import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import style from './test.module.scss';
import style1 from './test.module.css';
import style2 from './test.scss';
const modules = [];
const plugins = [];

console.log(style.test);

console.log(style1.test);

console.log(style2);



export default class Core {

  static plugin = p =>  plugins.push(p)

  static use = (module) => {
    modules.push(...module);
  };

  mount(selector, historyBasename = '/', initialState = {}) {
    console.log(modules);
    ReactDOM.render(
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <div>默认主页</div>} />
            {modules.map((item) => (
              <Route key={item.path} exact path={item.path} render={item.component} />
            ))}
          </Switch>
        </BrowserRouter>,
      document.querySelector(selector)
    );
  }
}
