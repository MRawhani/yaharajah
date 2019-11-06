import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.min.css'
import App from "./App";
import 'bootstrap-daterangepicker/daterangepicker.css';
import * as serviceWorker from "./serviceWorker";
const store = require("./reducers").init();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// mongodb+srv://YaharajahUser:<password>@cluster0-uroi5.mongodb.net/test?retryWrites=true&w=majority
//If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
