import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('tests made in the Login page', () => {
  it('should have a input for player name', () => {

    renderWithRouterAndRedux(<App />);
    const playerNameInput = screen.getByTestId('input-player-name');
    expect(playerNameInput).toBeInTheDocument();

  });
  it('should have a input for the user email', () => {

    renderWithRouterAndRedux(<App />);
    const userEmailInput = screen.getByTestId('input-gravatar-email');
    expect(userEmailInput).toBeInTheDocument();

  });
  it('should have a button for start the game, and be disabled at the start', () => {
    
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

  });
  test('if the button activate once the form is filled', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId('btn-play');
    const playerNameInput = screen.getByTestId('input-player-name');
    const userEmailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(playerNameInput, 'Trybe Test');
    userEvent.type(userEmailInput, 'test@beTrybe.com');
    expect(playButton).toBeEnabled();
  });

});

// describe('', () => {
//   test/it('', () => {

//   });
// });
