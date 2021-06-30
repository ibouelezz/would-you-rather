import React, { Component } from "react";
import { connect } from "react-redux";
import { Label, Menu, Tab } from "semantic-ui-react";
import Question from "./Question";
import NavBar from "./NavBar";

class Dashboard extends Component {
  render() {
    let answeredQuestions = [];
    let unansweredQuestions = [];

    const { authedUser, users, questionIds } = this.props;

    console.log(authedUser);

    authedUser
      ? Object.keys(users[authedUser].answers).map((qid) => {
          answeredQuestions.push(qid);
        })
      : null;

    questionIds.map((qid) => {
      answeredQuestions.includes(qid) ? null : unansweredQuestions.push(qid);
    });

    console.log(answeredQuestions, unansweredQuestions);

    const panes = [
      {
        menuItem: (
          <Menu.Item key="unanswered">
            Unanswered<Label>{unansweredQuestions.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Question qids={unansweredQuestions} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="answered">
            Answered<Label>{answeredQuestions.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Question qids={answeredQuestions} />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <>
        {/* <NavBar /> */}
        <Tab panes={panes} />
      </>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    users,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
