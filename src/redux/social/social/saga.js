import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  GET_ALL_SOCIAL,
} from '../../types/social/social';

import {
  getAllSocialSuccess,
  getAllSocialError,
} from './actions';

const getAllSocialAsync = async () => {
  return api
    .get(`/social`)
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllSocial() {
  try {
    const result = yield call(getAllSocialAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllSocialSuccess(result.data.data));
    } else {
      yield put(getAllSocialError('Faild to get all social!'));
    }
  } catch (error) {
    yield put(getAllSocialError('Faild to get all social!'));
  }
}

export function* watchGetAllSocial() {
  yield takeEvery(GET_ALL_SOCIAL, GetAllSocial);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllSocial),
  ]);
}
