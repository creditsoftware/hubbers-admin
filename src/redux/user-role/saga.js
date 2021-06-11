import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../ApiConfig';
import history from '../../history';
import {
  CREATE_USER_ROLE,
  GET_ALL_USER_ROLES,
  GET_USER_ROLE,
  UPDATE_USER_ROLE,
  DELETE_USER_ROLE,
} from '../types/user-role';

import { getAllUserRolesSuccess, getAllUserRolesError } from './actions';

export function* watchGetAllUserRoles() {
  yield takeEvery(GET_ALL_USER_ROLES, AllUserRoles);
}

const getAllUserRolesAsync = async () =>
  await api
    .get(`/user-role`)
    .then((res) => res)
    .catch((error) => error);

function* AllUserRoles() {
  try {
    const result = yield call(getAllUserRolesAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllUserRolesSuccess(result.data));
    } else {
      yield put(
        getAllUserRolesError('Get All UserRoles Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllUserRolesError('Get All UserRoles Error !'));
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetAllUserRoles)]);
}
