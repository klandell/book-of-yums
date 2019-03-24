/**
 *
 */
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const Other = lazy(() => import('./Other'));
const Error404 = lazy(() => import('./Error404'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
        <Route path="*" component={Error404} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
