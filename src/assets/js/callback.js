import queryString from 'query-string';
import AuthUtil from 'js/utils/AuthUtil';

const {hash} = window.location;
const {
  access_token: accessToken, expires_in: expiresIn, reason, result
} = queryString.parse(hash);

console.group('Process callback');
console.info(queryString.parse(hash));

if (reason === 'cancel' || !hash || +result === 0 || !accessToken) {
  console.info('something was wrong');
  console.info('redirect to root');

  if (window.location.pathname !== '/') window.location.href = '/';
} else {
  console.info('success');
  console.info('set auth cookie');
  AuthUtil.setAuthCookie(accessToken, expiresIn);

  if (window.location.pathname !== '/') window.location.href = '/';
}

console.groupEnd();
