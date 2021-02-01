import { combineReducers, createStore, applyMiddleware } from "redux";
import { userReducer } from "../reducer/userReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = [thunk];

const reducer = combineReducers({
  userInfo: userReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);
console.log(store);
console.log(reducer);
export { store };
