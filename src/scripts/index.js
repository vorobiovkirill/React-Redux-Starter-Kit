import '../styles/main.sass';

import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom'

import App from './app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
