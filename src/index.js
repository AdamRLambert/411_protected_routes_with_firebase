import React from "react";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

import { FakeCarsProvider } from "./Context/FakeCarsProvider";

const root = createRoot(document.getElementById("root"));
// <App /> Is Now  Child of <FakeCarsProvider>
root.render(
  <FakeCarsProvider>
    <App />
  </FakeCarsProvider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
