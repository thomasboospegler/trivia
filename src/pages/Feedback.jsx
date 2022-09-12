import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
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
