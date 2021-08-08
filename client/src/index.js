import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Room from "./components/Room";
import io from "socket.io-client";

const socket = io.connect(document.location.origin);

render(
  <Router>
    <Switch>
      <Route path="/room/:roomId/:username">
        <Room socket={socket}></Room>
      </Route>
      <Route path="/">
        <Login socket={socket}></Login>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
