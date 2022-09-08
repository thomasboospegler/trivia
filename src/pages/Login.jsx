import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchTriviaApi from '../services/triviaAPI';
import { userInfoAction } from '../redux/actions';

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
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          data-testid="input-player-name"
          value={ name }
          placeholder="user name"
          name="name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          value={ email }
          name="email"
          placeholder="user email"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ this.validateInpiuts() }
          onClick={ this.getTokenTrivia }
        >
          Play
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
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
