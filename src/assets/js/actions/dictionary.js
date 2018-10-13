import HTTPService from 'js/services/HTTPService';
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
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function getEnglishLevels() {
  return (dispatch) => {
    dispatch({
      type: DICTIONARY_GET_ENGLISH_LEVELS_REQUEST
    });

    return HTTPService('GET', '/english-levels', {pruneHeaders: ['Authorization']})
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, DICTIONARY_GET_ENGLISH_LEVELS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: DICTIONARY_GET_ENGLISH_LEVELS_SUCCESS,
          payload
        });
      });
  };
}

export function getTypesOfEnglish() {
  return (dispatch) => {
    dispatch({
      type: DICTIONARY_GET_TYPE_OF_ENGLISH_REQUEST
    });

    return HTTPService('GET', '/type-of-english', {pruneHeaders: ['Authorization']})
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, DICTIONARY_GET_TYPE_OF_ENGLISH_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: DICTIONARY_GET_TYPE_OF_ENGLISH_SUCCESS,
          payload
        });
      });
  };
}

export function getThemes() {
  return (dispatch) => {
    dispatch({
      type: DICTIONARY_GET_THEMES_REQUEST
    });

    return HTTPService('GET', '/themes', {pruneHeaders: ['Authorization']})
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, DICTIONARY_GET_THEMES_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: DICTIONARY_GET_THEMES_SUCCESS,
          payload
        });
      });
  };
}

export function getWordSets() {
  return (dispatch) => {
    dispatch({
      type: DICTIONARY_GET_WORDSETS_REQUEST
    });

    return HTTPService('GET', '/word-sets')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, DICTIONARY_GET_WORDSETS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: DICTIONARY_GET_WORDSETS_SUCCESS,
          payload
        });
      });
  };
}

export function getDegrees() {
  return (dispatch) => {
    dispatch({
      type: DICTIONARY_GET_DEGREES_REQUEST
    });

    return HTTPService('GET', '/degrees')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, DICTIONARY_GET_DEGREES_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: DICTIONARY_GET_DEGREES_SUCCESS,
          payload
        });
      });
  };
}

export function getLanguages() {
  return (dispatch) => {
    dispatch({
      type: LANGUAGES_GET_REQUEST
    });

    return HTTPService('GET', '/languages')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, LANGUAGES_GET_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: LANGUAGES_GET_SUCCESS,
          payload
        });
      });
  };
}
