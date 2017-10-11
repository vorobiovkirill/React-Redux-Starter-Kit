import '../styles/main.sass';
import 'babel-polyfill';

import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';

import App from './app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'react-router-redux';
import styled from 'styled-components';
import thunk from 'redux-thunk';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root'),
);
