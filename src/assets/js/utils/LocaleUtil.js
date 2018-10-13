class LocaleUtil {
  static mapLocale(locale) {
    const locales = {
      en: ['en'],
      ru: ['ru'],
      zh: ['cn']
    };

    if (locales[locale]) {
      return locales[locale];
    }

    throw new Error(`Locale nod found. Locale: ${locale}`);
  }

  static mapLocaleForMoment(locale) {
    const locales = {
      en: ['en'],
      ru: ['ru'],
      zh: ['zh-cn'],
      cn: ['zh-cn']
    };

    if (locales[locale]) {
      return locales[locale];
    }

    throw new Error(`Locale for moment nod found. Locale: ${locale}`);
  }

  static browserLocale() {
    const navigator = window.navigator || window.clientInformation || {};
    const languages = []
      .concat(
        navigator.languages,
        navigator.language,
        navigator.userLanguage,
        navigator.browserLanguage,
        navigator.systemLanguage,
        'cn'
      )
      .filter(language => language)
      .map(language => language.replace(/-.*/, '').toLowerCase());

    return [...new Set(languages)][0];
  }
}

export default LocaleUtil;