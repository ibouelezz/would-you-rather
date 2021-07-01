import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  Card,
  Message,
  Progress,
  Segment,
  Button,
  Label,
  Radio,
  Image,
  Form,
} from "semantic-ui-react";

import { handleAnswerQuestion } from "../actions/questions";

class QuestionView extends Component {
  state = {
    vote: null,
    message: { hidden: true, content: "" },
  };

  handleChange = (_, data) => {
    this.setState({ vote: data.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { vote } = this.state;
    if (!vote) {
      this.setState({
        message: {
          hidden: false,
          content: "Select an option, please!",
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
    const { authedUser, handleAnswerQuestion } = this.props;
    const qid = this.props.match.params.id;
    const answer = this.state.vote;

    handleAnswerQuestion({ authedUser, qid, answer });
  };

  pollResult = () => {
    const { authedUser, questions, users } = this.props;
    const qid = this.props.match.params.id;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const votedOptionOne = question.optionOne.votes.includes(authedUser);
    const votedOptionTwo = question.optionTwo.votes.includes(authedUser);
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const totalVotes = votesOptionOne + votesOptionTwo;
    const percentageOptionOne =
      Math.round((votesOptionOne / totalVotes) * 10000) / 100;
    const percentageOptionTwo =
      Math.round((votesOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Card key={qid} style={{ width: "400px" }}>
        <Card.Content>
          <Image circular floated="left" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>
            <i>Would you rather</i>
          </div>
          <Card.Description>
            <Segment>
              {votedOptionOne && (
                <Label ribbon="right" color="red">
                  Your Vote
                </Label>
              )}
              <p>{question.optionOne.text}</p>
              <Progress percent={percentageOptionOne} progress>
                {votesOptionOne} out of {totalVotes} votes
              </Progress>
            </Segment>
            <Segment>
              {votedOptionTwo && (
                <Label ribbon="right" color="red">
                  Your Vote
                </Label>
              )}
              <p>{question.optionTwo.text}</p>
              <Progress percent={percentageOptionTwo} progress>
                {votesOptionTwo} out of {totalVotes} votes
              </Progress>
            </Segment>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  didVote() {
    const { authedUser, questions } = this.props;
    const qid = this.props.match ? this.props.match.params.id : null;

    if (!qid) {
      console.log(this.props.history);
      <Redirect to="/404" />;
    }

    const question = questions[qid];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  }

  pollVote = () => {
    const { vote, message } = this.state;

    const { authedUser, questions, users } = this.props;
    const qid = this.props.match ? this.props.match.params.id : null;
    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    return (
      <Card key={qid}>
        <Card.Content>
          <Image size="tiny" src={user.avatarURL} floated="right" />
          <Card.Header>{user.name} asks</Card.Header>
          <div>
            <i>Would you rather</i>
          </div>
          <Card.Description>
            <Form>
              <Form.Field>
                <Radio
                  name="radioGroupVote"
                  label={question.optionOne.text}
                  checked={vote === "optionOne"}
                  value="optionOne"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  name="radioGroupVote"
                  label={question.optionTwo.text}
                  checked={vote === "optionTwo"}
                  value="optionTwo"
                  onChange={this.handleChange}
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
    );
  };

  componentDidMount() {
    console.log("didMount");
    const { questions } = this.props;
    const qid = this.props.match ? this.props.match.params.id : null;

    const question = questions[qid];
    if (!question) {
      const { history } = this.props;
      history.push("/404");
      // <Redirect to="/404" />;
    }
  }

  render() {
    if (this.props.lastRoute.includes("/questions/")) {
      <Redirect to="/404" />;
    }

    let result;
    if (this.didVote() === true) {
      result = this.pollResult();
    } else {
      result = this.pollVote();
    }
    return <Card.Group centered>{result}</Card.Group>;
  }
}

function mapStateToProps({ authedUser, users, questions, lastRoute }) {
  return {
    authedUser,
    users,
    questions,
    lastRoute,
  };
}

export default withRouter(
  connect(mapStateToProps, { handleAnswerQuestion })(QuestionView)
);
