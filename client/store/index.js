import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import businessReducer from "./business";
import reviewReducer from "./reviews"
import userReducer from "./user";

const reducer = combineReducers({ businessReducer, userReducer, reviewReducer });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./business";
export * from "./user";
