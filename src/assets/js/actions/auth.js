import queryString from 'query-string';
import Cookies from 'cookies-js';
import request from 'superagent';
import {
  AUTH_GET_TOKEN_FAIL,
  AUTH_GET_TOKEN_REQUEST,
  AUTH_GET_TOKEN_SUCCESS,
  AUTH_REFRESH_TOKEN_REQUEST,
  AUTH_REFRESH_TOKEN_SUCCESS,
  LOGOUT_SUCCES
} from 'js/constants/auth';
import AuthUtil from 'js/utils/AuthUtil';
import Utils from 'js/utils/Utils';
import LocaleUtil from 'js/utils/LocaleUtil';
import ActionUtils from 'js/utils/ActionUtil';

export function auth() {
  if (!window.location.origin) window.location.origin = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? `:${window.location.port}` : '')}`;

  const redirectUri = `${window.location.origin}/callback`;
  const state = Utils.randomFromRange(); // TODO: save state on client and compare its with returned from server value
  const lang = Cookies.get('UX_LANG') || LocaleUtil.mapLocale(LocaleUtil.browserLocale()); // TODO: get user language first from user settings
  const {clientId} = AuthUtil.client;

  window.location.href = `${CONFIG.authServerAddress}/authorize?responseType=token&clientId=${clientId}&redirectUri=${redirectUri}&state=${state}&lang=${lang}`;
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({
      type: AUTH_GET_TOKEN_REQUEST,
      payload: {
        username,
        password
      }
    });

    request
      .post(`${CONFIG.authServerAddress}/access_token`)
      .send({
        username,
        password,
        ...AuthUtil.client
      })
      .then(response => ActionUtils.processResponse(dispatch, response.body, AUTH_GET_TOKEN_FAIL))
      .then((response) => {
        dispatch({
          type: AUTH_GET_TOKEN_SUCCESS,
          payload: response.data
        });

        const state = Utils.randomFromRange();

        window.location.href = `/callback#access_token=${response.data.accessToken}&token_type=bearer&expires_in=14400&state=${state}&result=1`;
      });
  };
}

export function logout() {
  return (dispatch) => {
    AuthUtil.removeAuthCookie();
    dispatch({
      type: LOGOUT_SUCCES
    });

    if (AuthUtil.hasAuthCookie()) window.location.reload();
  };
}

export function refreshAccessToken() {
  return (dispatch) => {
    dispatch({
      type: AUTH_REFRESH_TOKEN_REQUEST
    });

    request
      .get(`${CONFIG.authServerAddress}/authorize`)
      .withCredentials()
      .query({
        responseType: 'token',
        redirectUri: `${window.location.origin}/callback`, // TODO: wrap, window.location.origin not supported all browsers
        lang: LocaleUtil.browserLocale(),
        forced: true,
        clientId: AuthUtil.client.clientId
      })
      .end((err, res) => {
        //  TODO: not working on server
        if (res) {
          const {
            access_token: accessToken, expires_in: expiresIn, result, code
          } = queryString.parse(res.req.xhr.responseURL.split('?')[1]);

          console.log('refreshAccessToken', code);

          if (parseInt(result, 10) === 1) {
            const expires = parseInt(expiresIn, 10);
            AuthUtil.setAuthCookie(accessToken, expires);

            dispatch({
              type: AUTH_REFRESH_TOKEN_SUCCESS,
              payload: {
                expires_in: expires,
                expires: (Date.now() / 1000 | 0) + expires
              }
            });
          } else {
            window.location.href = '/logout';
          }
        }
      });
  };
}