import React, { Component } from 'react';
import { shape, func } from 'prop-types';

export default class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1>Ranking</h1>
        <ol>
          {localRanking.map((player, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>
                { player.name }
              </p>
              <span data-testid={ `player-score-${index}` }>
                { player.score }
              </span>
              <div>
                <img src={ player.picture } alt="user" />
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
