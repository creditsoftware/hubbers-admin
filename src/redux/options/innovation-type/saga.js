import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig'

import {
  CREATE_INNOVATION_TYPE,
  GET_ALL_INNOVATION_TYPES,
  GET_INNOVATION_TYPE,
  UPDATE_INNOVATION_TYPE,
  DELETE_INNOVATION_TYPE,
} from '../../types/options/innovation-type';

import {
  createInnovationTypeSuccess,
  createInnovationTypeError,

  getAllInnovationTypesSuccess,
  getAllInnovationTypesError,

  deleteInnovationTypeSuccess,
  deleteInnovationTypeError
} from './actions';

//get all
export function* watchGetAllInnovationTypes() {
    yield takeEvery(GET_ALL_INNOVATION_TYPES, getAllInnovationTypes);
}

const getAllInnovationTypesAsync = async () =>
    await api.get(`/innovation-types`)
        .then((res) => res.data)
        .catch((error) => error);


function* getAllInnovationTypes() {
    try {
        const result = yield call(getAllInnovationTypesAsync);
        console.log('xxxxx =>', result)
        if (result.success) {
            yield put(getAllInnovationTypesSuccess(result.data))
        } else {
            yield put(getAllInnovationTypesError('Get All Users Response is not success!'))
        }
    } catch (error) {
        yield put(getAllInnovationTypesError('Get All Users Error !'))
    }
}


//create
export function* watchCreateInnovationType() {
  yield takeEvery(CREATE_INNOVATION_TYPE, createInnovationType);
}

const createInnovationTypeAsync = async ({ payload }) => {
  console.log('data =>', payload)
  return await api.post(`/innovation-types`, payload)
    .then((res) => res.data)
    .catch((error) => error)
}

function* createInnovationType(data) {
  try {
    const result = yield call(createInnovationTypeAsync, data);
    if (result.success) {
      yield put(createInnovationTypeSuccess(result.data))
    } else {
      yield put(createInnovationTypeError('Create Innovation Type is not success!'))
    }
  } catch (error) {
    yield put(createInnovationTypeError('Create Innovation Type is Error!'))
  }
}

// delete 
export function* watchDeleteInnovationType() {
  yield takeEvery(DELETE_INNOVATION_TYPE, deleteInnovationType)
}

function* deleteInnovationType(id) {
  try {
    const result = yield call(deleteInnovationTypeAsync, id)
    console.log('result =>', result)
    if(result.success) {
      yield put(deleteInnovationTypeSuccess(id))
    } else {
      yield put(deleteInnovationTypeError(result.message))
    }
  } catch (error) {
    console.log('error =>', error)
  }
}

const deleteInnovationTypeAsync = async ({ payload }) => {
  return await api.delete(`/innovation-types/${payload}`)
    .then((res) => res.data)
    .catch((error) => error)
}


export default function* rootSaga() {
  yield all([
    fork(watchCreateInnovationType),
    fork(watchGetAllInnovationTypes),
    fork(watchDeleteInnovationType),
  ]);
}
