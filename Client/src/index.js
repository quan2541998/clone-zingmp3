import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import GlobalStyle from "./component/GlobalStyles";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reduxConfig from "./store/store.js";

const { store, persistor } = reduxConfig();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
