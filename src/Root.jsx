import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainContent from './MainContent';
import { getLogin } from './plugin';
import { setAuthData, saveToken } from './toolkit/session';
const Root = ({ routers, core, history }) => {

  const loginComplete = (token, authData) => {
    saveToken(token);
    setAuthData(authData);
    history.push('/')
  };

  const Login = getLogin(core, { loginComplete });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" render={(props) => React.cloneElement(Login, props)} />
        <PrivateRoute path="/" component={MainContent} core={core} routers={routers} />
      </Switch>
    </Router>
  );
};

export default Root;
