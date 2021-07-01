import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setLastRoute } from "../actions/lastRoute";

function PrivateRoute({ children, ...rest }) {
  console.log(rest);
  rest.dispatch(setLastRoute(rest.location.pathname));
  return (
    <Route
      {...rest}
      render={() => {
        return rest.authedUser ? children : <Redirect to="/login" />;
      }}
    />
  );
}

export default connect()(PrivateRoute);
