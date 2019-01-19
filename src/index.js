//from create-react-app
import React from 'react';
import ReactDOM from 'react-dom';
//Mobx
import { Provider } from 'mobx-react';
import * as stores from './Store';
//Router
import { BrowserRouter } from 'react-router-dom';
import {Switch,Route} from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';
//Layout components
import Layout from './Layout/Main';
//Google Analytics
import ReactGA from 'react-ga';
// routes is route config
// cannot use import routes due to webpack
const routes = require('./Routes/RouteConfig').default();

ReactGA.initialize('UA-48967212-3');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  (
    <Provider {...stores}>
      <BrowserRouter>
        <Layout>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          <Route render={() => <p>The URL you are looking for does not exist.</p>} />
        </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);
