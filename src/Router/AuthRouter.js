import { Route, Redirect } from "react-router-dom";

const AuthRouter = ({ route }) => {
  console.log(route);
  if (route.auth) {
    if (localStorage.getItem("isLogin") == "true") {
      return <Route {...route} />;
    } else {
      return (
        <Route {...route}>
          <Redirect to="/login" from={route.path} />
        </Route>
      );
    }
  } else {
    return <Route {...route} />;
  }
};

export default AuthRouter;
