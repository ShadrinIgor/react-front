import Cookies from 'cookies-js';
// import * as authActions from 'js/actions/auth';

export default class AuthUtil {
  /**
   * @return {object}
   */
  static get client() {
    return {
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret
    };
  }

  /**
   * @return {string}
   */
  static get COOKIE_NAME() {
    return 'RF_AUTH_TOKEN';
  }

  /**
   * @return {string}
   */
  static get COOKIE_EXPIRES_NAME() {
    return 'RF_AUTH_TOKEN_EXPIRES';
  }

  /**
   * @return {string}
   */
  static get COOKIE_FIRST_STEP_NAME() {
    return 'RF_FIRST_STEP';
  }

  static hasAuthCookie() {
    const cookie = Cookies.get(this.COOKIE_NAME);
    return cookie || false;
  }

  static setAuthCookie(accessToken, expiresIn = Infinity) {
    Cookies.set(this.COOKIE_NAME, accessToken, {expires: parseInt(expiresIn, 10)});
    this.setExpiresCookie(expiresIn);
  }

  static setExpiresCookie(expiresIn = Infinity) {
    const currentSeconds = Date.now() / 1000 || 0;
    const expires = parseInt(expiresIn, 10);
    Cookies.set(this.COOKIE_EXPIRES_NAME, currentSeconds + expires, {expires});
  }

  static removeAuthCookie() {
    Cookies.expire(this.COOKIE_NAME);
  }

  static checkAccessAndRedirect(nextState, replace, replacePath = '/') {
    function redirect(path) {
      if (path !== window.location.pathname && path !== nextState.location.pathname) {
        replace(path);
      }
    }

    if (AuthUtil.hasAuthCookie()) {
      redirect(nextState.location.pathname);
    } else {
      redirect(replacePath);
    }
  }

  static checkExpiresIn(store) {
    this.store = store;
    const {auth} = this.store.getState();
    if (!this.checkExpiresTimeout) this.checkExpiresTimeout = setTimeout(::this.checkExpiresInHandler, (Math.max(30, auth.expires_in - 10) * 1000));
  }

  static checkExpiresInHandler() {
    const {auth} = this.store.getState();

    if (!auth.fetching && this.hasAuthCookie()) {
      //  TODO: remove or fix
      // this.store.dispatch(authActions.refreshAccessToken());
      clearTimeout(this.checkExpiresTimeout);
      delete this.checkExpiresTimeout;
      this.checkExpiresIn(this.store, auth.expires_in);
    }
  }

  static checkFirstStep() {
    const cookie = Cookies.get(this.COOKIE_FIRST_STEP_NAME);
    return cookie || false;
  }

  static checkFirstStepIsComplete() {
    const step = +this.checkFirstStep();
    return step && step >= 8;
  }

  static setFirstStep(step = 0) {
    Cookies.set(this.COOKIE_FIRST_STEP_NAME, step, {expires: Infinity});
  }
}