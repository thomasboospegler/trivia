import React, { Component } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
// import proptypes from 'prop-types';
import { shape, func } from 'prop-types';
=======
import { func, shape } from 'prop-types';
>>>>>>> de3b3c7e792843618a79600b7b66a4da424d5583

export default class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    handleClick = () => {
      const { history } = this.props;
      history.push('/');
    };

    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
<<<<<<< HEAD
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
=======
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>

>>>>>>> de3b3c7e792843618a79600b7b66a4da424d5583
    );
  }
}

Ranking.propTypes = {
  history: shape({
    push: func,
<<<<<<< HEAD
  }),
}.isRequired;
=======
  }).isRequired,
};
>>>>>>> de3b3c7e792843618a79600b7b66a4da424d5583
