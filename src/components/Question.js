import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { users, questions, qids } = this.props;

    // const { id, author, timestamp, optionOne, optionTwo } = questions[qids];

    const cards = qids.map((qid) => {
      return (
        <Card key={qid}>
          <Card.Content>
            <Image
              circular
              floated="left"
              size="tiny"
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

    return <Card.Group>{cards}</Card.Group>;
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
