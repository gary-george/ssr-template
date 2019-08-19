import { call, all } from 'redux-saga/effects';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { homeSaga, homeReducer } from '../modules/home';
import globalVars from '../utils/globalVars';
import * as R from 'ramda';
import createMemoryHistory from 'history/createMemoryHistory';

const reducers = {
  home: homeReducer,
};
const sagas = [call(homeSaga)];

export const configureStore = (
  fromServer = false,
  initialState = {},
  history
) => {
  const appReducer = combineReducers({
    routing: routerReducer,
    ...reducers,
  });

  //SSR since the server has no HTML5 push states, history must be temporarily created in memory
  const historyToUse = fromServer ? createMemoryHistory() : history;

  const rootSaga = function* rootSaga() {
    yield all([...sagas]);
  };

  const sagaMiddleware = createSagaMiddleware();

  let middleware = [routerMiddleware(historyToUse), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger({ collapsed: true })];
  }
  const showDevTools = R.pathOr(false, ['SHOW_REDUX_TOOLS'])(globalVars);
  const composeEnhancers =
    (showDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    (state, action) => appReducer(state, action),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);

  return { historyToUse, store };
};
