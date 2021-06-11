import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../ApiConfig';
import history from '../../history';

import {
  CREATE_USER,
  GET_ALL_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_ERROR,
} from '../types/user';

import {
  getAllUsersSuccess,
  getAllUsersError,
  getUsersSuccess,
  getUsersError,
} from './actions';

export function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USER, GetAllUsers);
}

const getAllUsersAsync = async () =>
  await api
    .get(`/user`)
    .then((res) => res)
    .catch((error) => error);

function* GetAllUsers() {
  try {
    const result = yield call(getAllUsersAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllUsersSuccess(result.data));
    } else {
      yield put(getAllUsersError('Get All Users Response is not success!'));
    }
  } catch (error) {
    yield put(getAllUsersError('Get All Users Error !'));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUser);
}

const getUsersAsync = async ({ payload }) =>
  await api
    .get(`/user/${payload}`)
    .then((res) => res)
    .catch((error) => error);

function* getUser(userId) {
  try {
    const result = yield call(getUsersAsync, userId);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getUsersSuccess(result.data.result));
    } else {
      yield put(getUsersError('Get User Response is not success!'));
    }
  } catch (error) {
    yield put(getUsersError('Get User Error !'));
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetAllUsers), fork(watchGetUser)]);
}
