import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import logoTrivia from '../images/logo trivia.png';
import vectorStar from '../images/Vector.png';
import '../styles/Ranking.css';

export default class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <main className="main-ranking-container">
        <section>
          <img className="logo-trivia" src={ logoTrivia } alt="logo trivia" />
        </section>
        <section className="ranking-container">
          <h1 data-testid="ranking-title">RANKING</h1>
          <ol>
            {localRanking
              .map((player, index) => (
                <li key={ index }>
                  <div className="">
                    <img className="player-picture" src={ player.picture } alt="user" />
                    <span data-testid={ `player-name-${index}` }>
                      { player.name }
                    </span>
                  </div>
                  <div className="ranking-score-container">
                    <img className="vector" src={ vectorStar } alt="star" />
                    <span data-testid={ `player-score-${index}` }>
                      { player.score }
                    </span>
                  </div>
                </li>
              ))}
          </ol>
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-go-home"
          >
            JOGAR NOVAMENTE
          </button>
        </section>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
