import request from 'superagent';
import {difference} from 'underscore';
import {
  NOTIFICATIONS_GET_ALL_FAIL,
  NOTIFICATIONS_GET_ALL_REQUEST,
  NOTIFICATIONS_GET_ALL_SUCCESS,
  NOTIFICATIONS_GET_USER_FAIL,
  NOTIFICATIONS_GET_USER_REQUEST,
  NOTIFICATIONS_GET_USER_SUCCESS,
  NOTIFICATIONS_USER_SUBSCRIBE_FAIL,
  NOTIFICATIONS_USER_SUBSCRIBE_REQUEST,
  NOTIFICATIONS_USER_SUBSCRIBE_SUCCESS,
  NOTIFICATIONS_USER_UNSUBSCRIBE_FAIL,
  NOTIFICATIONS_USER_UNSUBSCRIBE_REQUEST,
  NOTIFICATIONS_USER_UNSUBSCRIBE_SUCCESS,
  NOTIFICATIONS_USER_UPDATE_REQUEST
} from 'js/constants/notifications';
import HTTPService from 'js/services/HTTPService';
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function getAll() {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATIONS_GET_ALL_REQUEST
    });

    return HTTPService('GET', '/newsletters')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, NOTIFICATIONS_GET_ALL_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: NOTIFICATIONS_GET_ALL_SUCCESS,
          payload
        });
      });
  };
}

export function getForUser(userId) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATIONS_GET_USER_REQUEST
    });

    return request
      .get(`${CONFIG.apiURL}/users/${userId}/newsletters`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, NOTIFICATIONS_GET_USER_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: NOTIFICATIONS_GET_USER_SUCCESS,
          payload
        });
      });
  };
}

export function subscribe(userId, newsletterId) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATIONS_USER_SUBSCRIBE_REQUEST
    });

    return request
      .post(`${CONFIG.apiURL}/newsletters/${newsletterId}/users/${userId}`)
      .send({}) //  TODO: hack for server bug
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, NOTIFICATIONS_USER_SUBSCRIBE_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: NOTIFICATIONS_USER_SUBSCRIBE_SUCCESS,
          payload
        });
      });
  };
}

export function unsubscribe(userId, newsletterId) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATIONS_USER_UNSUBSCRIBE_REQUEST
    });

    return request
      .del(`${CONFIG.apiURL}/newsletters/${newsletterId}/users/${userId}`)
      .send({}) //  TODO: hack for server bug
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, NOTIFICATIONS_USER_UNSUBSCRIBE_FAIL, response))
      .end((error) => {
        if (error) return;

        dispatch({
          type: NOTIFICATIONS_USER_UNSUBSCRIBE_SUCCESS,
          payload: {
            newsletterId
          }
        });
      });
  };
}

export function update(userId, prevIds, nextIds) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATIONS_USER_UPDATE_REQUEST
    });

    const toSubscribe = difference(nextIds, prevIds);
    const toUnsubscribe = difference(prevIds, nextIds);

    toSubscribe.forEach(id => subscribe(userId, id)(dispatch));
    toUnsubscribe.forEach(id => unsubscribe(userId, id)(dispatch));
  };
}
