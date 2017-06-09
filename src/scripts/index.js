import { Link, Route, Router, browserHistory } from 'react-router-dom';

import { App } from './app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import css from '../styles/main.sass';

ReactDOM.render(
	<div>
		<App />
	</div>,
  document.getElementById('root')
);

