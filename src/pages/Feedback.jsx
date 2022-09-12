import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape } from 'prop-types';

class Feedback extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const MIN = 3;
    if (assertions < MIN) return this.setState({ text: 'Could be better...' });
    if (assertions >= MIN) return this.setState({ text: 'Well Done!' });
  }
  
   handleClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    const { text } = this.state;
    return (
      <div data-testid="feedback-text">
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleClick }
          type="button"
        >
          Ranking
        </button>
        <span data-testid="feedback-text">{ text }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: number.isRequired,
  assertions: number.isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
