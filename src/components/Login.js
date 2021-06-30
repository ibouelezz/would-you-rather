import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

const options = [
  { key: "johndoe", text: "John Doe", value: "johndoe" },
  { key: "sarahedo", text: "Sarah Edo", value: "sarahedo" },
  { key: "tylermcginnis", text: "Tyler McGinnis", value: "tylermcginnis" },
];

class Login extends Component {
  state = {
    selectedUser: "johndoe",
    redirect: false,
  };

  handleChange = (e) => {
    console.log(e.target.innerText.replace(" ", "").toLowerCase());

    this.setState({
      selectedUser: e.target.innerText.replace(" ", "").toLowerCase(),
    });
  };

  handleLogin = () => {
    this.props.dispatch(setAuthedUser(this.state.selectedUser));
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        I'd like to login as{" "}
        <Dropdown
          onChange={(e) => this.handleChange(e)}
          downward="true"
          floating
          inline
          options={options}
          defaultValue="johndoe"
        />{" "}
        <Button
          size="mini"
          content="Login"
          primary
          onClick={this.handleLogin}
        />
      </div>
    );
  }
}

export default connect()(Login);
