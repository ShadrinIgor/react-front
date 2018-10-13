import {UI_HEADER_TOGGLE, UI_SUBHEADER_RENDER, UI_SWITCH_LANGUAGE} from 'js/constants/ui';

const initialState = {
  showHeader: true,
  subHeaderLeftComponent: null,
  subHeaderRightComponent: null
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case UI_HEADER_TOGGLE:
      return {...state, showHeader: action.showHeader};

    case UI_SUBHEADER_RENDER:
      return {...state, ...action.payload};

    case UI_SWITCH_LANGUAGE:
      return {...state, ...action.payload};

    default:
      return state;
  }
};

export default ui;