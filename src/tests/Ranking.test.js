import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('tests made in the Ranking page', () => {
  const initialState = {
    player: {
      name: 'Trybe',
      assertions: 4,
      score: 217,
      gravatarEmail: 'trybe@betrybe.com',
    },
  };
  const route = '/ranking';
  const initialStorage = [
    {
      name: 'Trybe',
      assertions: 4,
      score: 217,
      gravatarEmail: 'trybe@betrybe.com',
    },
  ];
  localStorage.setItem('ranking', JSON.stringify(initialStorage));
  it('should have a home button, and a title', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/ranking');

    const title = screen.getByRole('heading', {name: 'Ranking'});
    expect(title).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /inicio/i });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  it('should have a display with the name, score, image and email', () => {
    renderWithRouterAndRedux(<App />, initialState, route);


    const nameElement = screen.getAllByText(/trybe/i);
    expect(nameElement[0]).toBeInTheDocument();

    const scoreElement = screen.getByText(/217/i);
    expect(scoreElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(/user/i);
    expect(imageElement).toBeInTheDocument();
  });
});

