import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import QuestionView from "./QuestionView";
import QuestionNew from "./QuestionNew";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./NavBar";
import Leaderboard from "./Leaderboard";

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
            <Route path="/new" component={QuestionNew} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/questions/:id" component={QuestionView} />
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
