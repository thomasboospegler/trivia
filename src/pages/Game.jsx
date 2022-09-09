import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import fetchQuestionsTriviaApi from '../services/fetchQuestionsTrivia';
import Header from '../components/Header';

const TIMER = 1000;

export default class Game extends Component {
  state = {
    results: [],
    questionNumber: 0,
    randomNumber: 0,
    clock: 30,
  };

  async componentDidMount() {
    const { history } = this.props;
    const TOKEN = localStorage.getItem('token');
    const { response_code: responseCode, results } = await fetchQuestionsTriviaApi(TOKEN);
    if (responseCode !== 0) history.push('/');
    const test = Math.random();
    this.setState({
      results,
      randomNumber: test,
    });
    this.timer();
  }

  timer = () => setInterval(() => {
    const { clock } = this.state;
    if (clock <= 0) return clearInterval();
    this.setState((previousState) => ({
      clock: previousState.clock - 1,
    }));
  }, TIMER);

  isButtonDisabled = () => {
    const { clock } = this.state;
    return (clock <= 0);
  };

  showCurrentQuestion = () => {
    const { results, questionNumber, randomNumber } = this.state;
    const {
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      question,
      // type,
    } = results[questionNumber];

    const allAnswers = [...incorrectAnswers, correctAnswer];
    const SUBTRACT_NUMBER = 0.5;
    allAnswers.sort(() => randomNumber - SUBTRACT_NUMBER);

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { allAnswers.map((answer, index) => (
            (answer === correctAnswer) ? (
              <button
                disabled={ this.isButtonDisabled() }
                type="button"
                key={ index }
                data-testid="correct-answer"
              >
                { answer }
              </button>
            ) : (
              <button
                disabled={ this.isButtonDisabled() }
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
    const { results, clock } = this.state;

    return (
      <div>
        <Header />
        { results.length > 0 ? (
          this.showCurrentQuestion()
        ) : <h1>Loading...</h1> }
        <span>{clock}</span>
      </div>
    );
  }
}

Game.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
