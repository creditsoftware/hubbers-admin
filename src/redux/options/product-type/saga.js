import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_PRODUCT_TYPE,
  GET_ALL_PRODUCT_TYPES,
} from '../../types/options/product-type';

import {
  createProductTypeSuccess,
  createProductTypeError,
  getAllProductTypesSuccess,
  getAllProductTypesError,
} from './actions';

export function* watchGetAllProductionType() {
  yield takeEvery(GET_ALL_PRODUCT_TYPES, getAllProductTypes);
}

const getAllProductTypesAsync = async () =>
  await api
    .get(`/product-types`)
    .then((res) => res.data)
    .catch((error) => error);

function* getAllProductTypes() {
  try {
    const result = yield call(getAllProductTypesAsync);
    console.log('xxxxx =>', result);
    if (result.success) {
      yield put(getAllProductTypesSuccess(result.data));
    } else {
      yield put(
        getAllProductTypesError('Get All Users Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllProductTypesError('Get All Users Error !'));
  }
}

// create
export function* watchCreateProductionType() {
  yield takeEvery(CREATE_PRODUCT_TYPE, createProductType);
}

const createProductTypeAsync = async ({ payload }) => {
  return await api
    .post(`/product-types`, payload)
    .then((res) => res.data)
    .catch((error) => error);
};

function* createProductType(data) {
  try {
    const result = yield call(createProductTypeAsync, data);
    console.log('result =>', result);
    if (result.success) {
      yield put(createProductTypeSuccess(result.data));
    } else {
      yield put(
        createProductTypeError('Create Production Type is not success!')
      );
    }
  } catch (error) {
    console.log('error =>', error);
  }
}

export default function* rootSaga() {
  yield all([fork(watchCreateProductionType), fork(watchGetAllProductionType)]);
}
