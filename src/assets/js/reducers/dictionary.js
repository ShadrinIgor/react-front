import Utils from 'js/utils/Utils';
import {
  DICTIONARY_GET_ENGLISH_LEVELS_FAIL,
  DICTIONARY_GET_ENGLISH_LEVELS_REQUEST,
  DICTIONARY_GET_ENGLISH_LEVELS_SUCCESS,
  DICTIONARY_GET_THEMES_FAIL,
  DICTIONARY_GET_THEMES_REQUEST,
  DICTIONARY_GET_THEMES_SUCCESS,
  DICTIONARY_GET_TYPE_OF_ENGLISH_FAIL,
  DICTIONARY_GET_TYPE_OF_ENGLISH_REQUEST,
  DICTIONARY_GET_TYPE_OF_ENGLISH_SUCCESS,
  DICTIONARY_GET_WORDSETS_FAIL,
  DICTIONARY_GET_WORDSETS_REQUEST,
  DICTIONARY_GET_WORDSETS_SUCCESS,
  DICTIONARY_GET_DEGREES_REQUEST,
  DICTIONARY_GET_DEGREES_SUCCESS,
  DICTIONARY_GET_DEGREES_FAIL,
  LANGUAGES_GET_REQUEST,
  LANGUAGES_GET_FAIL,
  LANGUAGES_GET_SUCCESS
} from 'js/constants/dictionary';

const initialState = {
  englishLevels: {
    fetching: false,
    count: 0,
    items: {}
  },
  typesOfEnglish: {
    fetching: false,
    count: 0,
    items: {}
  },
  themes: {
    fetching: false,
    count: 0,
    items: {}
  },
  wordSets: {
    fetching: false,
    count: 0,
    items: {}
  },
  degrees: {
    fetching: false,
    count: 0,
    items: {}
  },
  languages: {
    fetching: false,
    count: 0,
    items: {}
  },
};

const dictionary = (state = initialState, action) => {
  switch (action.type) {
    case DICTIONARY_GET_ENGLISH_LEVELS_REQUEST:
      return {...state, englishLevels: {...state.englishLevels, fetching: true}};
    case DICTIONARY_GET_ENGLISH_LEVELS_SUCCESS:
      return {
        ...state,
        englishLevels: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case DICTIONARY_GET_ENGLISH_LEVELS_FAIL:
      return {...state, englishLevels: {...state.englishLevels, fetching: false}};

    case DICTIONARY_GET_TYPE_OF_ENGLISH_REQUEST:
      return {...state, typesOfEnglish: {...state.typesOfEnglish, fetching: true}};
    case DICTIONARY_GET_TYPE_OF_ENGLISH_SUCCESS:
      return {
        ...state,
        typesOfEnglish: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case DICTIONARY_GET_TYPE_OF_ENGLISH_FAIL:
      return {...state, typesOfEnglish: {...state.typesOfEnglish, fetching: false}};

    case DICTIONARY_GET_THEMES_REQUEST:
      return {...state, themes: {...state.themes, fetching: true}};
    case DICTIONARY_GET_THEMES_SUCCESS:
      return {...state, themes: {...action.payload, fetching: false}};
    case DICTIONARY_GET_THEMES_FAIL:
      return {...state, themes: {...state.themes, fetching: false}};

    case DICTIONARY_GET_WORDSETS_REQUEST:
      return {...state, wordSets: {...state.wordSets, fetching: true}};
    case DICTIONARY_GET_WORDSETS_SUCCESS:
      return {...state, wordSets: {...action.payload, fetching: false}};
    case DICTIONARY_GET_WORDSETS_FAIL:
      return {...state, wordSets: {...state.wordSets, fetching: false}};

    case LANGUAGES_GET_REQUEST:
      return {...state, languages: {...state.languages, fetching: true}};
    case LANGUAGES_GET_SUCCESS:
      return {...state, languages: {...action.payload, fetching: false}};
    case LANGUAGES_GET_FAIL:
      return {...state, languages: {...state.languages, fetching: false}};

    case DICTIONARY_GET_DEGREES_REQUEST:
      return {...state, degrees: {...state.degrees, fetching: true}};
    case DICTIONARY_GET_DEGREES_SUCCESS:
      return {
        ...state,
        degrees: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case DICTIONARY_GET_DEGREES_FAIL:
      return {...state, degrees: {...state.degrees, fetching: false}};

    default:
      return state;
  }
};

export default dictionary;