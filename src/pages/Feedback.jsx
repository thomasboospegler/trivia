import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape, string } from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const { assertions,
      score, gravatarEmail, name,
    } = this.props;
    const MIN = 3;
    if (assertions < MIN) this.setState({ text: 'Could be better...' });
    if (assertions >= MIN) this.setState({ text: 'Well Done!' });

    const result = {
      assertions,
      score,
      gravatarEmail,
      name,
    };
    const localData = JSON.parse(localStorage.getItem('ranking'));
    if (localData) {
      const saveitem = [...localData, result];
      saveitem.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(saveitem));
    } else {
      localStorage.setItem('ranking', JSON.stringify([result]));
    }
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playAgainClick = () => {
    const { history } = this.props;
    history.push('/');
    console.log('Play Again');
  };

  render() {
    const { score, assertions } = this.props;
    const { text } = this.state;
    return (
      <div data-testid="feedback-text">
        <Header />
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleClick }
          type="button"
        >
          Ranking
        </button>
        <span data-testid="feedback-text">{text}</span>
        <button
          onClick={ this.playAgainClick }
          type="button"
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Feedback.propTypes = {
  score: number.isRequired,
  assertions: number.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  gravatarEmail: string.isRequired,
  name: string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
