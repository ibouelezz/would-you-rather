import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <BrowserRouter>
        <LoadingBar />
        <NavBar />
        <Dashboard />
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
