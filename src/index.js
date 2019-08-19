import '../assets/styles/common/index.scss';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import App from './app';

const history = createHistory();
import { configureStore } from './store/configure-store';

const initialState = window.INITIAL_STATE || {};
delete window.INITIAL_STATE;

history.listen(location => {
  window.scrollTo(0, 0);
});

const { historyToUse, store } = configureStore(false, history, initialState);

const rootEl = document.getElementById('app');
ReactDOM.render(<App store={store} history={historyToUse} />, rootEl);
