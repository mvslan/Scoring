import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Home from "./Home";
import Rank from "./Rank";
import Score from "./Score";
import Load from "./Load/load3";
import "./app.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/score">
            <Score />
          </Route>
          <Route path="/rank">
            <Rank />
          </Route>
          <Route path="/load">
            <Load />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
