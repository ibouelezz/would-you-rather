import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

class Question extends Component {
  render() {
    const { users, questions, qids } = this.props;
    const sortQuestionsByTimeStamp = (q) => {
      const questionsSorted = {};
      qids
        .map((qid) => questions[qid])
        .sort((a, b) => b.timestamp - a.timestamp)
        .forEach((question) => {
          questionsSorted[question.id] = question;
        });
      return questionsSorted;
    };

    console.log(sortQuestionsByTimeStamp(qids));

    const _qids = sortQuestionsByTimeStamp(qids);

    const cards = Object.keys(_qids).map((qid) => {
      return (
        <Card key={qid}>
          <Card.Content>
            <Image
              circular
              size="tiny"
              floated="left"
              src={users[questions[qid].author].avatarURL}
            />
            <Card.Header>{users[questions[qid].author].name} asks</Card.Header>
            <hr style={{ marginRight: "0px", width: "175px" }} />
            <div style={{ height: "fit-content" }}>
              <i>Would you rather</i> {questions[qid].optionOne.text}{" "}
              <strong>or</strong> {questions[qid].optionTwo.text}?
            </div>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                <Button fluid basic color="black">
                  View Poll
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      );
    });

    return (
      <Card.Group style={{ justifyContent: "center", margin: "0px" }}>
        {cards}
      </Card.Group>
    );
  }
}

function mapStateToProps({ questions, users }, { qids }) {
  return {
    users,
    questions,
    qids,
  };
}

export default connect(mapStateToProps)(Question);
