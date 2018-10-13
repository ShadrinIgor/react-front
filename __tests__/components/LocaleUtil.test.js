import 'core-js/es6/set';
import LocaleUtil from 'js/utils/LocaleUtil';

describe('LocaleUtils functions', () => {
  it('browserLocale must be a function', () => {
    expect(LocaleUtil.browserLocale).toBeInstanceOf(Function);
  });

  describe('browserLocale calls', () => {
    let navigator = {};
    it('latest versions of Chrome and Firefox set this correctly', () => {
      navigator = {
        languages: []
      };
      global.navigator = navigator;
      expect(LocaleUtil.browserLocale()).toHaveLength(2);
    });

    /** it('IE only', () => {
      navigator = {
        userLanguage: 'en'
      };
      //global.navigator = navigator;
      expect(Utils.browserLocale()).toBe('en');
    });

     it('latest versions of Chrome, Firefox, and Safari set this correctly', () => {
      navigator = {
        language: 'ru'
      };
      global.navigator = navigator;
      jest.resetModules;
      expect(Utils.browserLocale()).toBe('ru');
    }); */
  });
});