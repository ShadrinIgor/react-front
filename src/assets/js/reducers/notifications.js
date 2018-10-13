import {without} from 'underscore';
import {
  NOTIFICATIONS_GET_ALL_FAIL,
  NOTIFICATIONS_GET_ALL_REQUEST,
  NOTIFICATIONS_GET_ALL_SUCCESS,
  NOTIFICATIONS_GET_USER_FAIL,
  NOTIFICATIONS_GET_USER_REQUEST,
  NOTIFICATIONS_GET_USER_SUCCESS,
  NOTIFICATIONS_USER_SUBSCRIBE_SUCCESS,
  NOTIFICATIONS_USER_UNSUBSCRIBE_SUCCESS,
  NOTIFICATIONS_USER_UPDATE_REQUEST,
  NOTIFICATIONS_USER_UPDATE_SUCCESS
} from 'js/constants/notifications';

const initialState = {
  all: {
    fetching: false,
    count: 0,
    items: {}
  },
  user: {
    fetching: false,
    count: 0,
    items: []
  }
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_GET_ALL_REQUEST:
      return {...state, all: {...state.all, fetching: true}};
    case NOTIFICATIONS_GET_ALL_SUCCESS:
      const items = {...action.payload.items};
      return {
        ...state,
        all: {
          count: action.payload.count,
          items: Object.assign({}, ...Object.keys(items).map(key => ({[items[key].id]: items[key]}))),
          fetching: false
        }
      };
    case NOTIFICATIONS_GET_ALL_FAIL:
      return {...state, all: {...state.all, fetching: false}};

    case NOTIFICATIONS_GET_USER_REQUEST:
      return {...state, user: {...state.user, fetching: true}};
    case NOTIFICATIONS_GET_USER_SUCCESS:
      return {
        ...state,
        user: {
          count: action.payload.count,
          items: action.payload.items.map(item => item.newsletterId),
          fetching: false
        }
      };
    case NOTIFICATIONS_GET_USER_FAIL:
      return {...state, user: {...state.user, fetching: false}};


    case NOTIFICATIONS_USER_UPDATE_REQUEST:
      return {...state};

    case NOTIFICATIONS_USER_UPDATE_SUCCESS:
      return {...state};

    case NOTIFICATIONS_USER_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          count: state.user.count + 1,
          items: [].concat(state.user.items, action.payload.newsletterId),
        }
      };

    case NOTIFICATIONS_USER_UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          count: state.user.count - 1,
          items: without(state.user.items, action.payload.newsletterId),
        }
      };

    default:
      return state;
  }
};

export default notifications;