import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './app/home';

export default (

  <Router history={browserHistory}>
    <Route path='/' component={Home} />
  </Router>
  
);