import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Form, Image, Input, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import { handleAddQuestion } from "../actions/questions";
import { setActiveIndex } from "../actions/activeIndex";

class QuestionNew extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    message: { hidden: true, content: "" },
  };

  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  handleClick = async () => {
    const { optionOneText, optionTwoText } = this.state;
    const { authedUser: author } = this.props;

    if (!optionOneText || !optionTwoText) {
      this.setState({
        message: {
          hidden: false,
          content: "Please fill-in input fields",
        },
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: "",
        },
      });
    }

    await this.props.handleAddQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    this.props.history.push("/");
    this.props.setActiveIndex("home");
  };

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
    const { optionOneText, optionTwoText, message } = this.state;

    return (
      <div>
        <Card.Group centered>
          <Card style={{ width: "500px" }}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>
                <i>Would you rather</i>
              </div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Input
                      placeholder="Option One"
                      id="optionOneText"
                      onChange={this.handleOnChange}
                      value={optionOneText}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="Option Two"
                      id="optionTwoText"
                      onChange={this.handleOnChange}
                      value={optionTwoText}
                    />
                  </Form.Field>
                  <Message hidden={message.hidden} negative>
                    {message.content}
                  </Message>
                </Form>
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="black" onClick={this.handleClick}>
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return { authedUser, users };
};

export default withRouter(
  connect(mapStateToProps, { handleAddQuestion, setActiveIndex })(QuestionNew)
);
