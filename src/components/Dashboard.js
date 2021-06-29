import React, { Component } from "react";
import { connect } from "react-redux";
import { Label, Menu, Tab } from "semantic-ui-react";
import Question from "./Question";
// import Question from "./Question";

class Dashboard extends Component {
  render() {
    let answeredQuestions = [];
    let unansweredQuestions = [];

    const { authedUser, users, questions, questionIds } = this.props;

    authedUser
      ? Object.keys(users[authedUser].answers).map((qid) => {
          answeredQuestions.push(qid);
        })
      : null;

    questionIds.map((qid) => {
      answeredQuestions.includes(qid) ? null : unansweredQuestions.push(qid);
    });

    // questionIds.map((qid) => {
    //   questions[qid].optionOne.votes.length !== 0 ||
    //   questions[qid].optionTwo.votes.length !== 0
    //     ? answeredQuestions.push(qid)
    //     : unansweredQuestions.concat(qid);
    // });

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
      //   <div>
      //     <h3 className="center">Dashboard</h3>
      //     <ul className="dashboard-list">
      //       {this.props.questionIds.map((id) => (
      //         <li key={id}>{/* <Question id={id} /> */}</li>
      //       ))}
      //     </ul>
      //   </div>
      <Tab panes={panes} />
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    users,
    questions,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
