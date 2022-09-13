import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchTriviaApi from '../services/triviaAPI';
import { userInfoAction } from '../redux/actions';
import logoTrivia from '../images/logo trivia.png';
import iconTrybe from '../images/icone trybe.png';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateInpiuts = () => {
    const { name, email } = this.state;
    const emailRegex = /[^@]+@[^@]+\.[^@]+/gi;
    const MIN_LENGTH = 3;
    const isEmailValid = emailRegex.test(email);
    const isNameValid = name.length > MIN_LENGTH;
    return !(isNameValid && isEmailValid);
  };

  getTokenTrivia = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const userInfo = {
      name,
      email,
    };
    const { token } = await fetchTriviaApi();
    localStorage.setItem('token', token);
    dispatch(userInfoAction(userInfo));
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    return (
      <main className="container-main">
        <section className="container-logo">
          <img src={ logoTrivia } alt="logo trivia" />
        </section>
        <section className="container-login">
          <form onSubmit={ this.handleSubmit }>
            <input
              className="login-input"
              type="text"
              data-testid="input-player-name"
              value={ name }
              placeholder="Qual é o seu nome?"
              name="name"
              onChange={ this.handleChange }
            />
            <input
              className="login-input"
              type="email"
              data-testid="input-gravatar-email"
              value={ email }
              name="email"
              placeholder="Qual é o seu e-mail do gravatar?"
              onChange={ this.handleChange }
            />
            <button
              className="login-button"
              type="submit"
              data-testid="btn-play"
              disabled={ this.validateInpiuts() }
              onClick={ this.getTokenTrivia }
            >
              JOGAR
            </button>
            <Link to="/settings">
              <button
                className="login-settings"
                type="button"
                data-testid="btn-settings"
              >
                CONFIGURAÇÕES
              </button>
            </Link>
          </form>
        </section>
        <footer>
          <img className="trybe-icon" src={ iconTrybe } alt="Ícone Trybe" />
        </footer>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

export default connect()(Login);
