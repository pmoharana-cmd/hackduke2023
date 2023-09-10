import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import MainApp from "./components/MainApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/translation" Component={MainApp} />
      </Routes>
    </Router>
  </React.StrictMode>
);
