import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'

import {Application} from './Products/Application';
import ProductPage from './Products/Product';
import ProductListPage from './Products/ProductList';

const routes = (
    <Route path="/" component={Application}>
        <IndexRoute component={ProductListPage}/>
        <Route path="product/:id" component={ProductPage}/>
    </Route>
);

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render((
  <Router history={appHistory}>{routes}</Router>
), document.getElementById('root'));