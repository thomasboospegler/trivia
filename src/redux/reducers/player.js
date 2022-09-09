// import { PERSONAL_INFO } from '../actions';
import { REQUEST_LOGIN, UPDATE_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_LOGIN:
    return {
      ...state,
      name: action.userInfo.name,
      gravatarEmail: action.userInfo.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.value,
    };
  default:
    return state;
  }
};
export default player;
