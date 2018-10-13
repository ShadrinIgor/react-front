import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'moment/locale/ru';
import moment from 'moment';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import configureStore from 'js/store/configureStore';
import Routes from 'js/routes/Routes';
import i18n from 'js/i18n';
import AuthUtil from 'js/utils/AuthUtil';
import 'styles/app.sass';

import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bootstrap-sass/assets/javascripts/bootstrap/button';
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown';
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip';
import 'bootstrap-sass/assets/javascripts/bootstrap/popover';

window.requestAnimFrame = (() => window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  (callback => window.setTimeout(callback, 1000 / 60)))();

const supportsHistory = 'pushState' in window.history;
const store = configureStore();

AuthUtil.checkExpiresIn(store);

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 31);
moment.relativeTimeThreshold('M', 12);
moment.locale(i18n.language);

render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter history={!supportsHistory}>
        <Route component={Routes}/>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);