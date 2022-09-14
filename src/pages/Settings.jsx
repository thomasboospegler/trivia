import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import logoTrivia from '../images/logo trivia.png';
import '../styles/Settings.css';

export default class Settings extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <main className="main-settings-container" data-testid="settings-title">
        <section>
          <img src={ logoTrivia } alt="logo trivia" />
        </section>
        <section className="form-settings-container">
          <form className="form-settings">
            <h1>CONFIGURAÇÕES</h1>
            <select>
              <option>Categoria</option>
            </select>
            <select>
              <option>Dificuldade</option>
            </select>
            <select>
              <option>Tipo</option>
            </select>
            <button onClick={ this.handleClick } type="button">JOGAR</button>
          </form>
        </section>
      </main>
    );
  }
}

Settings.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
