import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';
import {
  CREATE_MEMBER,
  GET_ALL_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
} from '../../types/community/member';

import {
  getAllMember,
  getAllMemberSuccess,
  getAllMemberError,
  createMemberSuccess,
  createMemberError,
  updateMemberSuccess,
  updateMemberError,
  deleteMemberSuccess,
  deleteMemberError,
} from './actions';

const getAllMemberAsync = async () => {
  return api
    .get(`/community/member`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllMember() {
  try {
    const result = yield call(getAllMemberAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllMemberSuccess(result.data.data));
    } else {
      yield put(getAllMemberError('Get All Members Response is not success!'));
    }
  } catch (error) {
    yield put(getAllMemberError('Get All Members Error !'));
  }
}

const createMemberAsync = async ({ payload }) => {
  return api
    .post(`/community/member`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* CreateMember(payload) {
  try {
    const result = yield call(createMemberAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(createMemberSuccess(result.data.data));
      yield put(getAllMember());
    } else {
      yield put(createMemberError('Create Member Response is not success!'));
    }
  } catch (error) {
    console.log(error);
    yield put(createMemberError('Create Member Error !'));
  }
}

const updateMemberAsync = async ({ payload }) => {
  return api
    .put(`/community/member/${payload.id}`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateMember(payload) {
  try {
    const result = yield call(updateMemberAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(updateMemberSuccess(result.data.data));
      yield put(getAllMember());
    } else {
      yield put(updateMemberError('Update Member Response is not success!'));
    }
  } catch (error) {
    console.log(error);
    yield put(updateMemberError('Update Member Error !'));
  }
}

const deleteMemberAsync = async (payload) => {
  return api
    .delete(`/community/member/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteMember(payload) {
  try {
    const result = yield call(deleteMemberAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(deleteMemberSuccess(result.data.data));
      yield put(getAllMember());
    } else {
      yield put(deleteMemberError('Delete Member Response is not success!'));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteMemberError('Delete Member Error !'));
  }
}

export function* watchGetAllMember() {
  yield takeEvery(GET_ALL_MEMBER, GetAllMember);
}
export function* watchCreateMember() {
  yield takeEvery(CREATE_MEMBER, CreateMember);
}
export function* watchUpdateMember() {
  yield takeEvery(UPDATE_MEMBER, UpdateMember);
}
export function* watchDeleteMember() {
  yield takeEvery(DELETE_MEMBER, DeleteMember);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllMember),
    fork(watchCreateMember),
    fork(watchUpdateMember),
    fork(watchDeleteMember),
  ]);
}
