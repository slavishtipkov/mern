import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import { history } from "../store/history";

import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetails";

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
      <Route
        exact
        path="/task/:id"
        render={({ match }) => <ConnectedTaskDetail match={match} />}
      />
    </Provider>
  </Router>
);
