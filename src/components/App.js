import React, { useEffect } from "react";
// import { connect } from "react-redux";
import connect from "react-redux/lib/connect/connect";
import { Route, Switch } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import { fetchDataAsync } from "../store/slices/common.slice";
import Home from "./home";
import Error from "./error";
import LeaderBoard from "./leaderBoard";
import LoadingBar from "react-redux-loading";
import NavBar from "./navBar";
import NewQuestion from "./newQuestion";
import QuestionScreen from "./questionScreen";
import Signin from "./signin";
// import { Provider } from "react-redux";
// import store from "../store/store";

const navBarLinks = [
  {
    name: "Home",
    path: "/",
    exact: true,
  },
  {
    name: "New Question",
    path: "/add",
    exact: true,
  },
  {
    name: "Leader Board",
    path: "/leaderboard",
    exact: true,
  },
];

const authenticatedRoutes = (
  <Switch>
    <Route {...navBarLinks[0]}>
      <Home />
    </Route>
    <Route {...navBarLinks[1]}>
      <NewQuestion />
    </Route>
    <Route {...navBarLinks[2]}>
      <LeaderBoard />
    </Route>
    <Route path="/questions/:id" exact>
      <QuestionScreen />
    </Route>
    <Route>
      <Error title="404" text="Page not found" />
    </Route>
  </Switch>
);

const nonAuthenticatedRoutesRoutes = (
  <Switch>
    <Route>
      <Signin />
    </Route>
  </Switch>
);

function App({ authedUser, dispatch, loading }) {
  useEffect(() => {
    if (authedUser) dispatch(fetchDataAsync());
  }, [authedUser, dispatch]);

  return (
    <>
      <NavBar navBarLinks={navBarLinks} />
      <LoadingBar />
      <div id="app">
        <div className="container mt-5 mx-auto" style={{ maxWidth: "720px" }}>
          {authedUser
            ? !loading
              ? authenticatedRoutes
              : null
            : nonAuthenticatedRoutesRoutes}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser, loading }) => ({
  authedUser,
  loading,
});

export default connect(mapStateToProps)(App);
