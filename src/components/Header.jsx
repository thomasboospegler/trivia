import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';

class Header extends React.Component {
  state = {
    img: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const url = md5(email).toString();
    this.setState({ img: url });
  }

  render() {
    const { img } = this.state;
    const { user, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${img}` }
          alt="user_image"
        />
        <span data-testid="header-player-name">{ user }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  user: string.isRequired,
  email: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);
