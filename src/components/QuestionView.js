import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Segment,
  Label,
  Progress,
  Button,
  Form,
  Radio,
  Message,
} from "semantic-ui-react";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionView extends Component {
  state = { vote: null, message: { hidden: true, content: "" } };

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
          content: "Please select an option",
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

  questionResult = () => {
    const qid = this.props.match.params.id;
    const { authedUser, questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const votedForOptionOne = question.optionOne.votes.includes(authedUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);
    const voteCountOptionOne = question.optionOne.votes.length;
    const voteCountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = voteCountOptionOne + voteCountOptionTwo;
    const votePercentOptionOne =
      Math.round((voteCountOptionOne / totalVotes) * 10000) / 100;
    const votePercentOptionTwo =
      Math.round((voteCountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Card key={qid} style={{ width: "400px" }}>
        <Card.Content>
          <Image circular floated="left" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Segment>
              {votedForOptionOne && (
                <Label as="a" color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionOne.text}</p>
              <Progress percent={votePercentOptionOne} progress>
                {voteCountOptionOne} out of {totalVotes} votes
              </Progress>
            </Segment>
            <Segment>
              {votedForOptionTwo && (
                <Label color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionTwo.text}</p>
              <Progress percent={votePercentOptionTwo} progress>
                {voteCountOptionTwo} out of {totalVotes} votes
              </Progress>
            </Segment>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  didAnswer() {
    const { authedUser, questions } = this.props;
    const qid = this.props.match.params.id;

    const question = questions[qid];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  }

  questionAnswer = () => {
    const { vote, message } = this.state;

    const { authedUser, questions, users } = this.props;
    const qid = this.props.match.params.id;
    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    return (
      <Card key={qid} style={{ width: "400px" }}>
        <Card.Content>
          <Image floated="right" size="tiny" src={user.avatarURL} />
          <Card.Header style={{ paddingTop: "10px" }}>
            {user.name} asks
          </Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Form>
              <Form.Field>
                <Radio
                  label={question.optionOne.text}
                  name="radioGroupVote"
                  value="optionOne"
                  checked={vote === "optionOne"}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={question.optionTwo.text}
                  name="radioGroupVote"
                  value="optionTwo"
                  checked={vote === "optionTwo"}
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
    const { questions } = this.props;
    const qid = this.props.match.params.id;

    const question = questions[qid];
    if (!question) {
      const { history } = this.props;
      history.push("/404");
    }
  }

  render() {
    let result;
    if (this.didAnswer() === true) {
      result = this.questionResult();
    } else {
      result = this.questionAnswer();
    }
    return <Card.Group centered>{result}</Card.Group>;
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions,
  };
}

export default connect(mapStateToProps, { handleAnswerQuestion })(QuestionView);
