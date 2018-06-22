//from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
//Mobx
import { Provider } from 'mobx-react';
import * as stores from './Store';
//Router
import { BrowserRouter } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';
//Layout components
import Layout from './Layout/Main';
// routes is route config
// cannot use import routes due to webpack
const routes = require('./Routes/RouteConfig').default();

ReactDOM.render(
  (
    <Provider {...stores}>
      <BrowserRouter>
        <Layout>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Layout>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);
