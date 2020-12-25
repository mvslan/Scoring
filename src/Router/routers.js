import Home from "../Home";
import Rank from "../Rank";
import Score from "../Score";
import Load from "../Load/load3";
import Login from "../Login";
import Register from "../Register";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
    auth: true,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/score",
    component: Score,
    auth: true,
  },
  {
    path: "/rank",
    component: Rank,
    auth: true,
  },
  {
    path: "/load",
    component: Load,
    auth: true,
  },
];
