import React from 'react';
import Component from './Component';
export const loginPlugin = {
  type: 'login',
  getComponent: (data) => {
    const { loginComplete } = data.options;
    return <Component loginComplete={loginComplete} />
  }
};
