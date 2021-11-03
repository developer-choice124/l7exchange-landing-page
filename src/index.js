import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Leanding from "layouts/Leanding-page.js";
import RegisterPage from "components/Register/RegisterPage.js";
import Loginpage from "components/Login/Loginpage.js";
import Privacy from "components/privacy-policy/Privacy-policy.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";

import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";

ReactDOM.render(
  <HashRouter basename={"/"}>
    <Switch>
      <Route path="/betting_log" name="Login Page" render={props => <Loginpage {...props} />} />
      <Route path="/betting_id" name="Registration Page" render={props => <RegisterPage {...props} />} />
      <Route path="/privacy" name="Privacy" render={props => <Privacy {...props} />} />
      <Route path="/admin" name="Dashboard" render={props => <Admin {...props} />} />
      <Route path="/" name="Home Page" render={props => <Leanding {...props} />} />
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
