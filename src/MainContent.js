/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import { getLayout } from './plugin';

const MainContent = ({ core, routers }) => {
  
  const renderRoutes = () => {
    return routers.map((m) => <Route key={m.path} exact path={m.path} render={m.component} />);
  };

  const routeView = renderRoutes();

  const layout = getLayout(core, { routers, routeView });

  return React.cloneElement(layout);
};

export default MainContent;
