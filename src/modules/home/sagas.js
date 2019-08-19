import { fork, put, takeLatest, select } from 'redux-saga/effects';
import { GO_AWAY } from './actions';
import { push } from 'react-router-redux';

export function* goAway() {
  return yield put(push('/go-away'));
}

export const homeSaga = function* goAwaySaga() {
  yield takeLatest(GO_AWAY, goAway);
};
