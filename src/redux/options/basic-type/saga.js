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
  getAllBasicType,
} from './actions';

const getAllBasicTypeAsync = async (payload) =>
  api
    .get(`/basic-type/${payload.payload}`)
    .then((res) => res.data)
    .catch((error) => error);

function* GetAllBasicType(payload) {
  try {
    const result = yield call(getAllBasicTypeAsync, payload);
    if (result.success) {
      yield put(getAllBasicTypeSuccess(result.data));
    } else {
      yield put(getAllBasicTypeError('Get All Users Response is not success!'));
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

function* CreateBasicType(data) {
  try {
    const result = yield call(createBasicTypeAsync, data);
    if (result.success) {
      yield put(createBasicTypeSuccess(result.data));
      yield put(getAllBasicType(0));
    } else {
      yield put(createBasicTypeError('Create Basic Type is not success!'));
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

function* UpdateBasicType(data) {
  try {
    const result = yield call(updateBasicTypeAsync, data);
    if (result.success) {
      yield put(updateBasicTypeSuccess(result.data));
      yield put(getAllBasicType(0));
    } else {
      yield put(updateBasicTypeError('Update Basic Type is not success!'));
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

function* DeleteBasicType(data) {
  try {
    const result = yield call(deleteBasicTypeAsync, data);
    console.log('result =>', result);
    if (result.success) {
      yield put(deleteBasicTypeSuccess(result));
      yield put(getAllBasicType(0));
    } else {
      yield put(deleteBasicTypeError('Delete Basic Type is not success!'));
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

export function* watchGetAllBasicType() {
  yield takeEvery(GET_ALL_BASIC_TYPE, GetAllBasicType);
}

export function* watchCreateBasicType() {
  yield takeEvery(CREATE_BASIC_TYPE, CreateBasicType);
}

export function* watchUpdateBasicType() {
  yield takeEvery(UPDATE_BASIC_TYPE, UpdateBasicType);
}

export function* watchDeleteBasicType() {
  yield takeEvery(DELETE_BASIC_TYPE, DeleteBasicType);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllBasicType),
    fork(watchCreateBasicType),
    fork(watchUpdateBasicType),
    fork(watchDeleteBasicType),
  ]);
}
