import {
  FILES_CREATE_SLOT_FAIL,
  FILES_CREATE_SLOT_REQUEST,
  FILES_CREATE_SLOT_SUCCESS,
  FILES_UPLOAD_FAIL,
  FILES_UPLOAD_PROGRESS,
  FILES_UPLOAD_REQUEST,
  FILES_UPLOAD_SUCCESS
} from 'js/constants/files';

const initialState = {};

const files = (state = initialState, action) => {
  switch (action.type) {
    case FILES_CREATE_SLOT_REQUEST:
      state[action.uuid] = {...action.payload, fetching: true};
      return {...state};
    case FILES_CREATE_SLOT_SUCCESS:
      state[action.uuid] = {...action.payload, fetching: true};
      return {...state};
    case FILES_CREATE_SLOT_FAIL:
      state[action.uuid] = {...action.payload, fetching: false};
      return {...state};

    case FILES_UPLOAD_REQUEST:
      state[action.uuid] = {...action.payload, fetching: true};
      return {...state};
    case FILES_UPLOAD_PROGRESS:
      state[action.uuid] = {...action.payload, fetching: true};
      return {...state};
    case FILES_UPLOAD_SUCCESS:
      state[action.uuid] = {...action.payload, fetching: false};
      return {...state};
    case FILES_UPLOAD_FAIL:
      state[action.uuid] = {...action.payload, fetching: false};
      return {...state};

    default:
      return state;
  }
};

export default files;