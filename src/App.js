import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./Application";

function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}

export default App;
