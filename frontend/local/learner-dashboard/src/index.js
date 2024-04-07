import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LearnerLayout from "layouts/Learner.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={`/learner`} component={LearnerLayout} />
      <Redirect from={`/`} to="/learner/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
