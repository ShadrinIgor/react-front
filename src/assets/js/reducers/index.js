import {combineReducers} from 'redux';
import ui from './ui';
import modal from './modal';
import auth from './auth';
import user from './user';
import toasts from './toasts';
import dictionary from './dictionary';
import files from './files';
import locations from './locations';
import notifications from './notifications';
import publications from './publications';
import payments from './payments';

const app = combineReducers({
  ui,
  modal,
  auth,
  user,
  toasts,
  dictionary,
  files,
  locations,
  notifications,
  publications,
  payments
});

export default app;
