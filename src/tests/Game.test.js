import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import fetchResponse from './mocks/fetchResponse';
import App from '../App';

describe('tests made in the Login page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponse),
    });
  });
  afterEach(() => jest.clearAllMocks());
  const initialState = {
    player: {
      name: 'Trybe',
      assertions: 0,
      score: 0,
      gravatarEmail: 'trybe@betrybe.com',
    },
  };
  const route = '/game';
  const jestTimeOut = 35000;

  it('should have the user name, image and score in the screen', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    const userEmail = screen.getByText('Trybe');
    const userImage = screen.getByRole('img', { name: 'user_image' });
    const userScore = screen.getByText(0);

    expect(history.location.pathname).toBe('/game');
    expect(userEmail).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
    expect(userScore).toBeInTheDocument();
  });

  it('test', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/game');

    expect(global.fetch).toBeCalled();

    const loadingElement = screen.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();

    await waitFor(() => {
      const question1 = screen.getByText(
        /What was Rage Against/i,
      );
      expect(question1).toBeInTheDocument();

      const answersQuestion1 = ['Rage Against the Machine', 'Evil Empire',
        'Bombtrack', 'The Battle Of Los Angeles'];
      answersQuestion1.map((answerName) => {
        const answer = screen.getByRole('button', { name: answerName });
        return expect(answer).toBeInTheDocument();
      });

      const rightAnswer = screen.getByTestId('correct-answer');
      userEvent.click(rightAnswer);

      const nextButton = screen.getByRole('button', { name: /Next/i });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);

      const question2 = screen.getByText(
        /Vincent van Gogh cut/i,
      );
      expect(question2).toBeInTheDocument();
    });
  });

  it('teste SCORE', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);

    await waitFor(() => {
      const questions = [/What was Rage Against/i, /Vincent van Gogh cut/i,
        /In the 2012 animated film/i, /In Margaret Atwood/i, /Which of the following is/i];
      const length = 4;

      questions.map((question, index) => {
        const questionElement = screen.getByText(question);
        expect(questionElement).toBeInTheDocument();
        const rightAnswer = screen.getByTestId('correct-answer');
        userEvent.click(rightAnswer);
        const nextButton = screen.getByRole('button', { name: /Next/i });
        expect(nextButton).toBeInTheDocument();
        userEvent.click(nextButton);
        if (index === length) return expect(history.location.pathname).toBe('/feedback');
        const score = screen.getByTestId('header-score');
        return expect(score).not.toBe(0);
      });
    });
  });

  jest.setTimeout(jestTimeOut);
  it('teste TIMER', async () => {
    renderWithRouterAndRedux(<App />, initialState, route);

    const initialTimer = 30;
    const initialTimerElement = screen.getByText(initialTimer);
    expect(initialTimerElement).toBeInTheDocument();

    await new Promise((r) => {
      const time = 2000;
      setTimeout(r, time);
    });

    const timer = 29;
    const timerElement = screen.getByText(timer);
    expect(timerElement).toBeInTheDocument();

    await new Promise((r) => {
      const time = 30000;
      setTimeout(r, time);
    });

    const lastTimer = 0;
    const lastTimerElement = screen.getAllByText(lastTimer);
    expect(lastTimerElement).toHaveLength(2);
  });

  it('test if api fail', async () => {
    jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 10,
        results: [],
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/game');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
