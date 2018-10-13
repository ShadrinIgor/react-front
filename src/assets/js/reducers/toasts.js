import {TOAST_ADD, TOAST_REMOVE, TOAST_REMOVE_ALL} from 'js/constants/toasts';
import Utils from 'js/utils/Utils';

const initialToastState = {
  timestamp: 0,
  level: 'default',
  autoClose: true,
  showCloseButton: true,
  icon: null,
  title: 'dummy title',
  message: 'dummy message',
  action: null
};

const initialState = [];

const toasts = (state = initialState, action) => {
  switch (action.type) {
    case TOAST_ADD:
      return [
        ...state, {
          ...initialToastState,
          id: Utils.uuid(),
          timestamp: +new Date(),
          ...action.payload
        }
      ].sort((a, b) => b.timestamp - a.timestamp);

    case TOAST_REMOVE:
      return state.filter(toast => toast.id !== action.payload.id);

    case TOAST_REMOVE_ALL:
      return [];

    default:
      return state;
  }
};

export default toasts;