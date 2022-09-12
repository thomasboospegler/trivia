import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('tests made in the Login page', () => {
  afterEach(() => jest.clearAllMocks());
  const initialState = {
    player: {
      name: 'Trybe',
      assertions: 4,
      score: 217,
      gravatarEmail: 'trybe@betrybe.com',
    },
  };
  const route = '/feedback';

  it('should redirect to the ranking page after clicking the Ranking button', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/feedback');

    const rankingButton = screen.getByRole('button', { name: /Ranking/i });
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');
  });

  it('should redirect to the Login page after clicking the Play Again button', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/feedback');

    const playAgainButton = screen.getByRole('button', { name: /Play/i });
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    expect(history.location.pathname).toBe('/');
  });

  it('should have the text "Well Done" if you have more than 3 assertions', () => {
    renderWithRouterAndRedux(<App />, initialState, route);

    const feedbackTextElement = screen.getByText(/Well done/i);
    expect(feedbackTextElement).toBeInTheDocument();
  });

  it('should have the text "Could be better" if you have less than 3 assertions', () => {
    const state = {
      player: {
        name: 'Trybe',
        assertions: 2,
        score: 100,
        gravatarEmail: 'trybe@betrybe.com',
      },
    };
    renderWithRouterAndRedux(<App />, state, route);

    const feedbackTextElement = screen.getByText(/Could be better/i);
    expect(feedbackTextElement).toBeInTheDocument();
  });
});
