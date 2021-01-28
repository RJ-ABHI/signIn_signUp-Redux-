import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import DashBoard from "./dashboard";
import Login from "./login";

import Reg from "./registration";

class main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Switch>
          <Route path="/registration" component={Reg} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={DashBoard} />
        </Switch>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default main;
