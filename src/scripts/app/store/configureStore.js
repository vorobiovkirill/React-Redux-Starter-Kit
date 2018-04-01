import { applyMiddleware, compose, createStore } from "redux";

import chalk from "chalk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import logger from "redux-logger";
import reducer from "../reducers/reducers";
import thunk from "redux-thunk";

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// configure store
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const configureStore = initialState => {
  const store = createStoreWithMiddleware(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/reducers", () => {
      try {
        const nextRootReducer = require("../reducers/reducers").default;
        store.replaceReducer(nextRootReducer);
      } catch (error) {
        console.error(
          chalk.red(`==> 😭  Reducer hot reloading error ${error}`)
        );
      }
    });
  }

  return store;
};

export default configureStore;
