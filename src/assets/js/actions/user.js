import request from 'superagent';
import {
  USER_GET_DATA_FAIL,
  USER_GET_DATA_REQUEST,
  USER_GET_DATA_SUCCESS,
  USER_REGISTRATION_STATUSBAR_TOGGLE,
  USER_SET_DATA_FAIL,
  USER_SET_DATA_REQUEST,
  USER_SET_DATA_SUCCESS
} from 'js/constants/user';
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function retrieveInformationAboutUser() {
  return (dispatch) => {
    dispatch({
      type: USER_GET_DATA_REQUEST
    });
    return request
      .get(`${CONFIG.apiURL}/users/me`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, USER_GET_DATA_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        AuthUtil.setFirstStep(payload.registrationStep);
        if (payload.avatar === null || payload.avatar.status !== 'processing') {
          dispatch({
            type: USER_GET_DATA_SUCCESS,
            payload
          });
        } else {
          setTimeout(() => {
            retrieveInformationAboutUser()(dispatch);
          }, 2000);
        }
      });
  };
}

export function firstRegistrationToggleStatusBar(flag = true) {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTRATION_STATUSBAR_TOGGLE,
      payload: {
        registrationStatusBarShow: flag
      }
    });
  };
}

export function updateUserFields(userId, fields) {
  return (dispatch) => {
    dispatch({
      type: USER_SET_DATA_REQUEST
    });
    return request
      .put(`${CONFIG.apiURL}/users/${userId}`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .send(fields)
      .ok(response => ActionUtil.processError(dispatch, USER_SET_DATA_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        AuthUtil.setFirstStep(payload.registrationStep);
        if (!fields.avatar || (payload.avatar && payload.avatar.status === 'processed')) {
          dispatch({
            type: USER_SET_DATA_SUCCESS,
            payload
          });
        } else {
          retrieveInformationAboutUser()(dispatch);
        }
      });
  };
}