import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";

import Login from "./Login";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import QuestionNew from "./QuestionNew";
import QuestionView from "./QuestionView";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    console.log(authedUser);

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {authedUser ? <NavBar /> : <Redirect to="/login" />}
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" authedUser={authedUser}>
              <Dashboard />
            </ProtectedRoute>
            {/* <Route path="/new" component={QuestionNew} /> */}
            <ProtectedRoute path="/new" authedUser={authedUser}>
              <QuestionNew />
            </ProtectedRoute>
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/questions/:id" component={QuestionView} />
            <Route path="/404" component={PageNotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
