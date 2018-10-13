import * as authActions from 'js/actions/auth';
import * as toastsActions from 'js/actions/toasts';
import {TOAST_LEVEL_ERROR, TOAST_LEVEL_WARNING} from 'js/constants/toasts';

// const t = translate(['validationCodes'], {wait: true})({});

class ActionUtils {
  static processErrorToToast(dispatch, data) {
    dispatch(toastsActions.add(data));
  }

  static processError(dispatch, type, response) {
    const {status, body = {}} = response || {};
    const {data = {}, events = []} = body;

    if (status === 200 && body.status === 200 || body.status === 404) return data;

    if (events.length) {
      Object.keys(events).map((item, index) => {
        const event = events[index];
        // if (!event.data.field) {
        ActionUtils.processErrorToToast(dispatch, {
          level: TOAST_LEVEL_WARNING,
          title: event.title || `Error ${event.type}`,
          message: event.message || `Error code: ${event.data.code}`
        });
        // }
        return item;
      });
    } else {
      ActionUtils.processErrorToToast(dispatch, {
        level: TOAST_LEVEL_ERROR,
        title: 'Error',
        message: status ? `Error ${body.status}` : ''
      });
    }

    return response;
  }

  static processResponse(dispatch, response, typeError) {
    const {status, body = {}} = response || {};
    if (status !== 200) {
      ActionUtils.processError(dispatch, typeError, response);
      return false;
    }

    switch (body.status) {
      case 200:
        return response.body;
      case 403:
        dispatch(authActions.logout());
        window.location.reload();
        break;
      default:
        ActionUtils.processError(dispatch, typeError, response);
        return false;
    }
  }
}

export default ActionUtils;

