/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './toolkit/session';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ component: Component, routers, core, ...props }) => {

  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} render={props => <Component core={core} routers={routers} {...props} />} />;
};
