import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Label, Grid } from "semantic-ui-react";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    const trophyColors = ["red", "orange", "yellow"];
    let rank = 0;
    let rankSuffix = ["st", "nd", "rd"];

    const usersWithScore = {};
    Object.keys(users).map((uid) => {
      const user = users[uid];
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      user.score = answeredQuestions + createdQuestions;
      usersWithScore[uid] = user;
    });

    const scoreSorted = {};
    Object.keys(users)
      .map((uid) => users[uid])
      .sort((a, b) => b.score - a.score)
      .map((user) => {
        scoreSorted[user.id] = user;
      });

    const userCards = Object.keys(scoreSorted).map((uid) => {
      const user = scoreSorted[uid];
      let label = null;
      let trophyColor = trophyColors[rank++];
      if (trophyColor) {
        label = {
          as: "div",
          corner: "right",
          icon: "trophy",
          color: trophyColor,
        };
      }
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      const score = answeredQuestions + createdQuestions;
      return (
        <Card key={uid}>
          <Image label={label} src={user.avatarURL} />
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>
              Rank &nbsp;
              <Label size="tiny">
                {rank}
                {rankSuffix.shift() || "th"}
              </Label>
            </Card.Meta>
            <Card.Description>
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column floated="left" width={11}>
                    Answered: {answeredQuestions}
                    <br />
                    Created: {createdQuestions}
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <div>
                      <strong>Score</strong>
                    </div>
                    <Label circular color={trophyColor} size="large">
                      {score}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return <Card.Group itemsPerRow="3">{userCards}</Card.Group>;
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps)(Leaderboard);
