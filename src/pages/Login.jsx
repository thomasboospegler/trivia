import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
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
          type="button"
          disabled={ this.validateInpiuts() }
          data-testid="btn-play"
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
