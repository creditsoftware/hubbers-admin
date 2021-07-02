import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_INNOVATION_TYPE,
  GET_ALL_INNOVATION_TYPES,
  UPDATE_INNOVATION_TYPE,
  DELETE_INNOVATION_TYPE,
} from '../../types/options/innovation-type';

import {
  createInnovationTypeSuccess,
  createInnovationTypeError,
  getAllInnovationTypesSuccess,
  getAllInnovationTypesError,
  deleteInnovationTypeSuccess,
  deleteInnovationTypeError,
  updateInnovationTypeSuccess,
  updateInnovationTypeError,
} from './actions';

const getAllInnovationTypesAsync = async () =>
  api
    .get(`/innovation-types`)
    .then((res) => res.data)
    .catch((error) => error);

function* getAllInnovationTypes() {
  try {
    const result = yield call(getAllInnovationTypesAsync);
    console.log('xxxxx =>', result);
    if (result.success) {
      yield put(getAllInnovationTypesSuccess(result.data));
    } else {
      yield put(
        getAllInnovationTypesError('Get All Users Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllInnovationTypesError('Get All Users Error !'));
  }
}

const createInnovationTypeAsync = async ({ payload }) => {
  console.log('data =>', payload);
  return api
    .post(`/innovation-types`, payload)
    .then((res) => res.data)
    .catch((error) => error);
};

function* createInnovationType(data) {
  try {
    const result = yield call(createInnovationTypeAsync, data);
    if (result.success) {
      yield put(createInnovationTypeSuccess(result.data));
    } else {
      yield put(
        createInnovationTypeError('Create Innovation Type is not success!')
      );
    }
  } catch (error) {
    yield put(createInnovationTypeError('Create Innovation Type is Error!'));
  }
}

const deleteInnovationTypeAsync = async ({ payload }) => {
  return api
    .delete(`/innovation-types/${payload}`)
    .then((res) => res.data)
    .catch((error) => error);
};

function* deleteInnovationType(id) {
  try {
    const result = yield call(deleteInnovationTypeAsync, id);
    console.log('result =>', result);
    if (result.success) {
      yield put(deleteInnovationTypeSuccess(id));
    } else {
      yield put(deleteInnovationTypeError(result.message));
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

const updateInnovationTypeAsync = async ({ payload }) => {
  console.log('data =>', payload);

  return api
    .put(`/innovation-types/${payload.id}`, payload)
    .then((res) => res.data)
    .catch((error) => error);
};

function* updateInnovationType(data) {
  try {
    const result = yield call(updateInnovationTypeAsync, data);
    console.log('result =>', result);
    if (result.success) {
      yield put(updateInnovationTypeSuccess(result.data));
    } else {
      yield put(updateInnovationTypeError(result.message));
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

// get all
export function* watchGetAllInnovationTypes() {
  yield takeEvery(GET_ALL_INNOVATION_TYPES, getAllInnovationTypes);
}

// create
export function* watchCreateInnovationType() {
  yield takeEvery(CREATE_INNOVATION_TYPE, createInnovationType);
}

// delete
export function* watchDeleteInnovationType() {
  yield takeEvery(DELETE_INNOVATION_TYPE, deleteInnovationType);
}

// update

export function* watchUpdateInnovationType() {
  yield takeEvery(UPDATE_INNOVATION_TYPE, updateInnovationType);
}

export default function* rootSaga() {
  yield all([
    fork(watchCreateInnovationType),
    fork(watchGetAllInnovationTypes),
    fork(watchDeleteInnovationType),
    fork(watchUpdateInnovationType),
  ]);
}
