import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Component from "./component/mainComp";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
console.log("store", store);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Component />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
