import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_BASIC_TYPE,
  GET_ALL_BASIC_TYPE,
  UPDATE_BASIC_TYPE,
  DELETE_BASIC_TYPE,
} from '../../types/options/basic-type';

import {
  createBasicTypeSuccess,
  createBasicTypeError,
  getAllBasicTypeSuccess,
  getAllBasicTypeError,
  updateBasicTypeSuccess,
  updateBasicTypeError,
  deleteBasicTypeSuccess,
  deleteBasicTypeError,
} from './actions';

const getAllBasicTypeAsync = async (payload) =>
  api
    .get(`/basic-type/${payload.payload}`)
    .then((res) => res.data)
    .catch((error) => error);

function* getAllBasicType(payload) {
  try {
    const result = yield call(getAllBasicTypeAsync, payload);
    if (result.success) {
      yield put(getAllBasicTypeSuccess(result.data));
    } else {
      yield put(
        getAllBasicTypeError('Get All Users Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllBasicTypeError('Get All Users Error !'));
  }
}

const createBasicTypeAsync = async ({ payload }) => {
  return api
    .post(`/basic-type`, payload)
    .then((res) => res.data)
    .catch((error) => error);
};

function* createBasicType(data) {
  try {
    const result = yield call(createBasicTypeAsync, data);
    if (result.success==true) {
      yield put(createBasicTypeSuccess(result.data));
      yield put(getAllBasicType(0));
    } else {
      yield put(
        createBasicTypeError('Create Basic Type is not success!')
      );
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

const updateBasicTypeAsync = async ({ payload }) => {
  return api
    .put(`/basic-type/${payload.id}`, payload)
    .then((res) => res.data)
    .catch((error) => error);
};

function* updateBasicType(data) {
  try {
    const result = yield call(updateBasicTypeAsync, data);
    if (result.success==true) {
      yield put(updateBasicTypeSuccess(result.data));
      yield put(getAllBasicType(0));
    } else {
      yield put(
        updateBasicTypeError('Update Basic Type is not success!')
      );
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

const deleteBasicTypeAsync = async ({ payload }) => {
  return api
    .delete(`/basic-type/${payload}`)
    .then((res) => res.data)
    .catch((error) => error);
};

function* deleteBasicType(data) {
  try {
    const result = yield call(deleteBasicTypeAsync, data);
    console.log('result =>', result);
    if (result.success==true) {
      yield put(deleteBasicTypeSuccess(result.data));
      yield put(getAllBasicType(0));
    } else {
      yield put(
        deleteBasicTypeError('Delete Basic Type is not success!')
      );
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

export function* watchGetAllBasicType() {
  yield takeEvery(GET_ALL_BASIC_TYPE, getAllBasicType);
}

export function* watchCreateBasicType() {
  yield takeEvery(CREATE_BASIC_TYPE, createBasicType);
}

export function* watchUpdateBasicType() {
  yield takeEvery(UPDATE_BASIC_TYPE, updateBasicType);
}

export function* watchDeleteBasicType() {
  yield takeEvery(DELETE_BASIC_TYPE, deleteBasicType);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllBasicType),
    fork(watchCreateBasicType),
    fork(watchUpdateBasicType),
    fork(watchDeleteBasicType),
  ]);
}