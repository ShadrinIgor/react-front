import {
  AUTH_GET_TOKEN_REQUEST,
  AUTH_GET_TOKEN_SUCCESS,
  AUTH_REFRESH_TOKEN_REQUEST,
  AUTH_REFRESH_TOKEN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCES
} from 'js/constants/auth';

const initialState = {
  fetching: false,
  expires_in: 60
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {...state, fetching: true};
    case LOGOUT_SUCCES:
      return {...state, fetching: false};
    case AUTH_GET_TOKEN_REQUEST:
      return {...state, fetching: true};
    case AUTH_GET_TOKEN_SUCCESS:
      return {...state, fetching: false, ...action.payload};
    case AUTH_REFRESH_TOKEN_REQUEST:
      return {...state, fetching: true};
    case AUTH_REFRESH_TOKEN_SUCCESS:
      return {...state, fetching: false, ...action.payload};

    default:
      return state;
  }
};

export default auth;