import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import authentication from "./reducer";

const createRootReducer = () =>
  combineReducers({
    authentication,
  });

const initState = {
  authentication: {
    currentUser: null,
    token: "",
    error: "",
    loading: false,
    isAuthenticated: false,
  },
}

export default function makeStore(initialState = initState) {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
