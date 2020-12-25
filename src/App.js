import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import AuthRouter from "./Router/AuthRouter";
import routes from "./Router/routers";
import Home from "./Home";
import Register from "./Register";
import axios from "axios";
import "./app.css";
import "antd/dist/antd.css";

axios.get("/api/ranks/").then((res) => {
  if (res.data.code === -1) {
    localStorage.setItem("isLogin", false);
  } else {
    localStorage.setItem("isLogin", true);
  }
});

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
    };
  }
  render() {
    return <Route {...this.props.route} />;
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route) => {
            console.log(<AuthRouter route={route} />);
            console.log();
            return <Test route={route} />;

            // return <AuthRouter route={route} />;
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
