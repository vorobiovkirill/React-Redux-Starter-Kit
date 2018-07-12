import "./styles/main.sass";

import App from "./scripts/App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./scripts/app/store/configureStore";

const store = configureStore();
const ROOT = document.getElementById("root");

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	ROOT
);

module.hot.accept();
