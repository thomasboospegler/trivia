import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import proptypes from 'prop-types';
import { shape, func } from 'prop-types';

export default class Ranking extends Component {
  render() {
    handleClick = () => {
      const { history } = this.props;
      history.push('/');
    };

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
        <Link to="/">
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;
