import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>404: Page Not Found!</h1>
        <p>
          Try instead going to <Link to="/">dashboard</Link> instead!
        </p>
      </div>
    );
  }
}

export default PageNotFound;
