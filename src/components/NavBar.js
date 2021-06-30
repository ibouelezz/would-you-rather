import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Segment, Label } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class NavBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    console.log("Logout");

    this.props.dispatch(setAuthedUser(null));
  };

  componentDidUpdate() {
    this.state.activeItem = this.props.activeIndex;
  }

  render() {
    const { users, authedUser } = this.props;
    // const { loggedIn, avatarURL } = users[authedUser];
    const { activeItem } = this.state;

    return (
      <Segment inverted style={{ marginTop: "0px", borderRadius: "0px" }}>
        <Menu inverted pointing secondary>
          <NavLink to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/new">
            <Menu.Item
              name="new question"
              active={activeItem === "new question"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="leaderboard">
            <Menu.Item
              name="leaderboard"
              active={activeItem === "leaderboard"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <Menu.Menu position="right">
            {authedUser && (
              <Label
                size="mini"
                style={{ padding: "5px", alignSelf: "center" }}
              >
                {`Hi, ${users[authedUser].name}`}
              </Label>
            )}
            <Menu.Item name="Logout" onClick={this.handleLogout} />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = ({ authedUser, users, activeIndex }) => {
  return { authedUser, users, activeIndex };
};

export default connect(mapStateToProps)(NavBar);
