import React from 'react';
import { Route } from 'react-router-dom';

// from React-Router example
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact ? true : false}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default RouteWithSubRoutes;
