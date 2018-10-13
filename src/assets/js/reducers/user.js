import moment from 'moment';
import {
  USER_GET_DATA_REQUEST,
  USER_GET_DATA_SUCCESS,
  USER_REGISTRATION_STATUSBAR_TOGGLE,
  USER_SET_DATA_FAIL,
  USER_SET_DATA_REQUEST,
  USER_SET_DATA_SUCCESS
} from 'js/constants/user';

const initialState = {
  fetching: false,
  registrationStep: 0,
  registrationSteps: 8,
  registrationStatusBarShow: false,
  timediff: 0
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_DATA_REQUEST:
      return {...state, fetching: true};
    case USER_GET_DATA_SUCCESS:
      const timediff = moment(action.payload.userTime).diff(moment());
      const data = {...action.payload, timediff};
      return {...state, fetching: false, ...data};
    case USER_REGISTRATION_STATUSBAR_TOGGLE:
      return {...state, ...action.payload};

    case USER_SET_DATA_REQUEST:
      return {...state, fetching: true};
    case USER_SET_DATA_SUCCESS:
      return {...state, fetching: false, ...action.payload};
    case USER_SET_DATA_FAIL:
      return {...state, fetching: false};

    default:
      return state;
  }
};

export default user;