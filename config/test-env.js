//	https://auth0.com/blog/testing-react-applications-with-jest/

import $ from 'jquery';

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.$ = global.jQuery = $;