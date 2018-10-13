import {MODAL_CLOSE, MODAL_OPEN} from 'js/constants/modal';

export function open(props = {}) {
  return (dispatch) => {
    dispatch({
      type: MODAL_OPEN,
      payload: props
    });
  };
}

export function close() {
  return (dispatch) => {
    dispatch({
      type: MODAL_CLOSE
    });
  };
}