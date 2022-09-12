import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

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

  render() {
    const { score, assertions } = this.props;
    const { text } = this.state;
    return (
      <div data-testid="feedback-text">
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
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
};

export default connect(mapStateToProps)(Feedback);
