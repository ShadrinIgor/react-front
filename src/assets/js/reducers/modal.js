import {MODAL_CLOSE, MODAL_OPEN} from 'js/constants/modal';

const initialState = {
  close: true,
  title: null,
  subtitle: null,
  children: null,
  actions: {}
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {...state, ...action.payload, close: false};

    case MODAL_CLOSE:
      return {...initialState};

    default:
      return state;
  }
};

export default modal;