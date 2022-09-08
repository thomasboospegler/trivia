// import { PERSONAL_INFO } from '../actions';
import { REQUEST_LOGIN } from '../actions';

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
  default:
    return state;
  }
};
export default player;
