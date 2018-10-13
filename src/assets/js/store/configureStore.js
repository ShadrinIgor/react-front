import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'js/reducers';

const configureStore = (initialState) => {
  const composeEnhancers = NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
  const store = composeEnhancers(applyMiddleware(thunkMiddleware))(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('js/reducers', () => {
      const nextRootReducer = require('js/reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;