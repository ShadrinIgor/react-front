class Utils {
  static randomFromRange(min = 0, max = 9999999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static uuid() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
  }

  static normalize(arr, key = 'id') {
    return Object.assign({}, ...Object.keys(arr).map(k => ({[arr[k][key]]: arr[k]})));
  }

  static sortByField(field) {
    return (a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    };
  }

  static queryFilter(options, name = 'filter') {
    return Object.keys(options).reduce((result, item) => {
      const itemValue = options[item];
      if (itemValue !== null) result[`${name}[${item}]`] = itemValue;
      return result;
    }, {});
  }
}

export default Utils;