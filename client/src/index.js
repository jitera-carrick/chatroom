import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

render(
  <Router>
    <Switch>
      <Route path="rooms/:roomId"></Route>
      <Route path="/" component={Login}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
