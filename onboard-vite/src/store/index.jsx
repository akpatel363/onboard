import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

const configureStore = (state = {}) => {
  const composeEnhancers =
    (import.meta.env.DEV &&
      typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    combineReducers({
      common: reducers.commonReducer,
      page: reducers.pageReducer,
    }),
    state,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
