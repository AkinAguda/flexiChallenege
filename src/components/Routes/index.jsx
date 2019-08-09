import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home';

const Routes = () => (
  <>
    <Route path="/" exact component={Home} />
    <Route
      path="/search/:query"
      exact
      render={prop => <Home {...prop} isSearch />}
    />
  </>
);

export default Routes;
