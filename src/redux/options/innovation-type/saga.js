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
} from './actions';

// export function* watchGetAllUsers() {
//     yield takeEvery(GET_ALL_USER, GetAllUsers);
// }

// const getAllUsersAsync = async () =>
//     await api.get(`/user`)
//         .then((res) => res)
//         .catch((error) => error);


// function* GetAllUsers() {
//     try {
//         const result = yield call(getAllUsersAsync);
//         if (result.status === 200 && result.statusText === 'OK') {
//             yield put(getAllUsersSuccess(result.data))
//         } else {
//             yield put(getAllUsersError('Get All Users Response is not success!'))
//         }
//     } catch (error) {
//         yield put(getAllUsersError('Get All Users Error !'))
//     }
// }

export function* watchCreateInnovationType() {
  yield takeEvery(CREATE_INNOVATION_TYPE, createInnovationType);
}

const createInnovationTypeAsync = async ({ payload }) => {
  console.log('data =>', payload)
  return await api.post(`/innovation-types`, payload)
    .then((res) => res)
    .catch((error) => error)
}

function* createInnovationType(data) {
  try {
    const result = yield call(createInnovationTypeAsync, data);
    if (result.data.success) {
      yield put(createInnovationTypeSuccess(result.data.data))
    } else {
      yield put(createInnovationTypeError('Create Innovation Type is not success!'))
    }
  } catch (error) {
    yield put(createInnovationTypeError('Create Innovation Type is Error!'))
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchCreateInnovationType)
  ]);
}
