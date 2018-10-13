import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

function loadLocales(url, options, callback) {
  require.ensure([], () => {
    const contextNLS = require.context('bundle-loader!./locales', true, /^\.\//);
    const handler = contextNLS(`./${url}`);

    if (handler) {
      handler((nls) => {
        callback(nls.default, {status: '200'});
      });
    } else {
      callback(null, {status: '404'});
    }
  });
}

export default i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    whitelist: ['en', 'ru', 'cn'],
    // whitelist: ['en'],
    ns: ['common'],
    defaultNS: 'common',
    load: 'currentOnly',
    debug: false,
    backend: {
      loadPath: '{{lng}}/{{ns}}.js',
      parse: data => data,
      ajax: loadLocales
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'header'],
      lookupCookie: 'UX_LANG',
      lookupQuerystring: 'lang',
      caches: ['cookie'],
      cookieDomain: NODE_ENV === 'development' ? undefined : `.${window.location.host}`,
      cookieMinutes: 60 * 24 * 365
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format(value, format, lng) {
        console.dir('i18n', value, format, lng);

        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });