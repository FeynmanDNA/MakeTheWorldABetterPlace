//from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
//Router
import { BrowserRouter, Route } from 'react-router-dom';
//Layout components
import Layout from './Layout/Layout';
// routes is route config
// cannot use import routes due to webpack
const routes = require('./Routes/RouteConfig').default();

// from React-Router example
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

ReactDOM.render(
  (
    <BrowserRouter>
      <Layout>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Layout>
    </BrowserRouter>
  ),
  document.getElementById('root')
);

registerServiceWorker();
