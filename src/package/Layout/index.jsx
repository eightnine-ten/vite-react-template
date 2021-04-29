import React from 'react';
import Component from './Component';
export const layoutPlugin = {
  type: 'layout',
  getComponent: (data) => {
    const { routers } = data.options;
    const history = data.core.getHistory();
    return <Component history={history} routers={routers} />
  }
};
