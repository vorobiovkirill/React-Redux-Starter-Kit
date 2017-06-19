import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import css from '../styles/main.sass';

import Home from './app/home';

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

