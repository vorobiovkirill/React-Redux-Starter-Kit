import './styles/main.sass';

import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';

import App from './scripts/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './scripts/app/store/configureStore';

const store = configureStore();
const ROOT = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	ROOT,
);
