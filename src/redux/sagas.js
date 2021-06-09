/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userRoleSagas from './user-role/saga';
import userSaga from './user/saga';


import innovationTypeSaga from './options/innovation-type/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userRoleSagas(),
    userSaga(),

    innovationTypeSaga(),
  ]);
}
