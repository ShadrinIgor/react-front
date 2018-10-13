/* eslint-disable */

if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    A = new Array(len);
    k = 0;

    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }

    return A;
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {

      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;

    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    if (n >= len) {
      return -1;
    }

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

var browsers = [
  {
    id: "chrome",
    name: "Chrome",
    title: "Google Chrome",
    version: 45,
    url: "https://www.google.com/chrome/browser/desktop/"
  },
  {
    id: "ie",
    name: "Internet Explorer",
    title: "Internet explorer",
    version: 9,
    url: "https://www.microsoft.com/download/internet-explorer.aspx"
  },
  {
    id: "firefox",
    name: "Firefox",
    title: "Firefox",
    version: 45,
    url: "https://www.mozilla.org/firefox"
  },
  {
    id: "safari",
    name: "Safari",
    title: "Safari",
    version: 7.1,
    url: "https://support.apple.com/safari"
  }
];

var locales = {
  en: {
    title: "Please upgrade you browser to use our platform",
    message: "We build our platform using latest technology. It makes our platform faster and easier to use Unfortunately your browser doesn't support those technologies. Download one of these and your be on your way:",
    messageDetect: "We build our platform using latest technology. It makes our platform faster and easier to use Unfortunately your browser doesn't support those technologies. You need to update your browser:",
    version: "Ver",
    update: "Update"
  },
  ru: {
    title: "Обновите браузер, чтобы использовать нашу платформу.",
    message: "Мы строим нашу платформу с использованием новейших технологий. Это делает нашу платформу более быстрой и простой в использовании. К сожалению, ваш браузер не поддерживает эти технологии. Скачайте один из них, и вы будете на пути:",
    messageDetect: "Мы строим нашу платформу с использованием новейших технологий. Это делает нашу платформу более быстрой и простой в использовании. К сожалению, ваш браузер не поддерживает эти технологии. Вам необходимо обновить браузер:",
    version: "Вер.",
    update: "Обновить"
  },
  cn: {
    title: "请升级您的浏览器以使用我们的平台",
    message: "我们使用最新技术构建我们的平台。 它使我们的平台更快更容易使用。幸运的是，您的浏览器不支持这些技术。 下载其中一个，你会在你的路上：",
    messageDetect: "我们使用最新技术构建我们的平台。 它使我们的平台更快更容易使用不幸的是，您的浏览器不支持这些技术。 您需要更新浏览器：",
    version: "版",
    update: "更新"
  }
};

var tplBrowser = function(locale, browser) {
  return "" +
    "<th class=\"browser\">" +
    "  <div class=\"logo " + browser.id + "\"></div>" +
    "  <div>" +
    "    <div>" + browser.title + "</div>" +
    "    <div class=\"muted\">" + locale.version + " " + browser.version + "+</div>" +
    "  </div>" +
    "  <div class=\"actions\">" +
    "    <a class=\"btn\" href=\"" + browser.url + "\" target=\"_blank\"><span>" + locale.update + "</span></a>" +
    "  </div>" +
    "</th>";
};

var tpl = function(browsersRenderer, locale, browsers, bowser) {
  return "" +
    "<table class=\"container\" border=\"0\">" +
    "  <tr>" +
    "    <td class=\"content\" valign=\"middle\">" +
    "      <div class=\"content-box\">" +
    "         <div class=\"logo-main\"></div>" +
    "         <h2>" + locale.title + "</h2>" +
    "         <p class=\"muted\">" + locale.messageDetect + "</p>" +
    "         <table class=\"browsers\" border=\"0\"><tr>" + renderBrowsers(tplBrowser, locale, browsers, bowser) + "</tr></table>" +
    "      </div>" +
    "    </td>" +
    "  </tr>" +
    "</table>";
};

function getBrowserLanguages() {
  var navigator = window.navigator || window.clientInformation || {};
  var languages = []
    .concat(
      navigator.languages,
      navigator.language,
      navigator.userLanguage,
      navigator.browserLanguage,
      navigator.systemLanguage,
      'en'
    )
    .filter(function(language) { return language; })
    .map(function(language) { return language.replace(/-.*/, '').toLowerCase(); });

  return languages;
}

function renderBrowsers(tpl, locale, browsers, bowser, noCheck) {
  var tplArr = [];
  var count = 0;
  noCheck = noCheck || false;
  for (var i = 0; i < browsers.length; i++) {
    if (noCheck) {
      tplArr.push(tpl(locale, browsers[i]));
      count++
    } else {
      if (detectBrowser(bowser, browsers[i])) {
        tplArr.push(tpl(locale, browsers[i]));
        count++
      }
    }
  }

  if (!count && browsers.length) {
    return renderBrowsers(tpl, locale, browsers, bowser, true)
  }

  return tplArr.join("");
}

function uniq(arr) {
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (var key in obj) {
    ret_arr.push(key);
  }
  return ret_arr;
}

function mapLanguage(locale) {
  var locales = [
    {
      key: "en",
      alias: "en"
    }, {
      key: "ru",
      alias: "ru"
    }, {
      key: "zh",
      alias: "cn"
    }
  ];

  var supportedLanguage = locales.filter(function(value) { return value.key === locale});

  if (supportedLanguage.length > 0) {
    return supportedLanguage[0].alias;
  }

  return locales[0].alias;
}

function chooseLanguage(navigatorLanguage, supportedLanguages) {
  var language;

  navigatorLanguage.forEach(function (value) {
    if (supportedLanguages.indexOf(value) !== -1) {
      if (!language) {
        language = value;
      }
    }
  });

  if (!language) {
    language = supportedLanguages[0];
  }

  return language;
}

function detectBrowser(bowser, browser) {
  var isCurrent = bowser.name === browser.name;
  var isSupported = Number(bowser.version) >= browser.version;

  return isCurrent;
}

function getLanguage() {
  var supportedLanguages = ['zh', 'en', 'ru'];
  var navigatorLanguages = uniq(getBrowserLanguages());
  var language = chooseLanguage(navigatorLanguages, supportedLanguages);

  return mapLanguage(language);
}

document.getElementById("root").innerHTML = tpl(renderBrowsers, (locales[getLanguage()] || locales['en']), browsers, window.bowser);