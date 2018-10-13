import configureStore from 'js/store/configureStore';
import * as toastsActions from 'js/actions/toasts';

const store = configureStore();

class APIUtil {
  static processResponse(response, success, error) {
    console.log('processResponse', response, success, error);

    const {status, data, events} = response;

    if (status === 200) {
      if (success) success(data);
    } else {
      if (error) error(error);
      APIUtil.processErrors(events);
    }
  }

  static processErrors(errors) {
    store.dispatch(toastsActions.add({test: errors}));
  }

  static prepareFile(file) {
    const urls = file ? file.urls : {};

    return Object.assign({}, urls);
  }
}

export default APIUtil;