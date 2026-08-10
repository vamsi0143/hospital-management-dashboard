import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Toaster position="top-right" />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
