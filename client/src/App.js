import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Login from "./components/Login";

import MUITable from "./components/MUITable";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/table" component={MUITable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
