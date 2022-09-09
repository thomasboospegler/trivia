import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import fetchQuestionsTriviaApi from '../services/fetchQuestionsTrivia';
import Header from '../components/Header';
import './Game.css';

export default class Game extends Component {
  state = {
    results: [],
    questionNumber: 0,
    correct: '',
    incorrect: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const TOKEN = localStorage.getItem('token');
    const { response_code: responseCode, results } = await fetchQuestionsTriviaApi(TOKEN);
    if (responseCode !== 0) history.push('/');
    this.setState({
      results,
    });
  }

  answerClick = (e) => {
    e.preventDefault();
    this.setState({ incorrect: 'question_false', correct: 'question_true' });
  };

  showCurrentQuestion = () => {
    const { results, questionNumber, incorrect, correct } = this.state;
    const {
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      question,
      // type,
    } = results[questionNumber];

    const allAnswers = [...incorrectAnswers, correctAnswer];
    const SUBTRACT_NUMBER = 0.5;
    allAnswers.sort(() => Math.random() - SUBTRACT_NUMBER);

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { allAnswers.map((answer, index) => (
            (answer === correctAnswer) ? (
              <button
                onClick={ this.answerClick }
                className={ correct }
                type="button"
                key={ index }
                data-testid="correct-answer"
              >
                { answer }
              </button>
            ) : (
              <button
                onClick={ this.answerClick }
                className={ incorrect }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>
            )
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { responseCode, results } = this.state;
    console.log(results, responseCode);

    return (
      <div>
        <Header />
        { results.length > 0 ? (
          this.showCurrentQuestion()
        ) : <h1>Loading...</h1> }
      </div>
    );
  }
}

Game.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
