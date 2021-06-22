import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
} from '../../types/community/event';

import { getAllEventsError, getAllEventsSuccess } from './actions';

const getAllEventsAsync = async () =>
  await api
    .get(`/community/event`)
    .then((res) => res)
    .catch((error) => error);

function* GetAllEvents() {
  try {
    const result = yield call(getAllEventsAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllEventsSuccess(result.data.data));
    } else {
      yield put(
        getAllEventsError('Get All Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllEventsError('Get All Community Error !'));
  }
}

const getSingleCommunityAsync = async (payload) =>
  await api
    .get(`/community/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);

function* GetSingleCommunity(payload) {
  try {
    console.log(payload.payload);
    const result = yield call(getSingleCommunityAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getSingleCommunitySuccess(result.data.data));
    } else {
      yield put(
        getSingleCommunityError('Get Single Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleCommunityError('Get Single Community Error !'));
  }
}

const createCommunityAsync = async ({ payload }) =>
  await api
    .post(`/community`, { ...payload })
    .then((res) => res)
    .catch((error) => error);

function* CreateCommunity(payload) {
  try {
    const result = yield call(createCommunityAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(createCommunitySuccess(result.data.data));
    } else {
      yield put(
        createCommunityError('Create Community Response is not success!')
      );
    }
  } catch (error) {
    console.log(error);
    yield put(createCommunityError('Create Community Error !'));
  }
}

const updateCommunityAsync = async ({ payload }) =>
  await api
    .put(`/community/${payload.id}`, { ...payload })
    .then((res) => res)
    .catch((error) => error);

function* UpdateCommunity(payload) {
  try {
    const result = yield call(updateCommunityAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(updateCommunitySuccess(result.data.data));
    } else {
      yield put(
        updateCommunityError('Update Community Response is not success!')
      );
    }
  } catch (error) {
    console.log(error);
    yield put(updateCommunityError('Update Community Error !'));
  }
}

export function* watchGetAllCommunity() {
  yield takeEvery(GET_ALL_COMMUNITY, GetAllCommunity);
}
export function* watchCreateCommunity() {
  yield takeEvery(CREATE_COMMUNITY, CreateCommunity);
}
export function* watchGetSingleCommunity() {
  yield takeEvery(GET_SINGLE_COMMUNITY, GetSingleCommunity);
}
export function* watchUpdateCommunity() {
  yield takeEvery(UPDATE_COMMUNITY, UpdateCommunity);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCommunity),
    fork(watchCreateCommunity),
    fork(watchGetSingleCommunity),
    fork(watchUpdateCommunity),
  ]);
}
