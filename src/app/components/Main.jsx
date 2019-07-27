import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import { history } from "../store/history";

import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
    </Provider>
  </Router>
);
