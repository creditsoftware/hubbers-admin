import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../../ApiConfig';

import {
  GET_ALL_COURSE,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
} from '../../../types/community/course/main';

import {
  getAllCourse,
  getAllCourseSuccess,
  getAllCourseError,
  createCourseSuccess,
  createCourseError,
  updateCourseSuccess,
  updateCourseError,
  deleteCourseSuccess,
  deleteCourseError,
} from './actions';

const getAllCourseAsync = async () => {
  return api
    .get(`/community/course`)
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllCourse() {
  try {
    const result = yield call(getAllCourseAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllCourseSuccess(result.data.data));
    } else {
      yield put(
        getAllCourseError(
          'Faild to get all courses!'
        )
      );
    }
  } catch (error) {
    yield put(getAllCourseError('Faild to get all courses!'));
  }
}

const createCourseAsync = async ({ payload }) => {
  return api
    .post(`/community/course`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};
function* CreateCourse(payload) {
  try {
    const result = yield call(createCourseAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      if (result.data.errors) {
        yield put(createCourseError(result.data.errors));
      }
      if (result.data.result) {
        yield put(createCourseSuccess(result.data.result));
      }
      yield put(getAllCourse());
    } else {
      yield put(
        createCourseError(
          'Faild to create course!'
        )
      );
    }
  } catch (error) {
    yield put(createCourseError('Faild to create course!'));
  }
}

const updateCourseAsync = async ({ payload }) => {
  return api
    .put(`/community/course/${payload.id}`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};
function* UpdateCourse(payload) {
  try {
    const result = yield call(updateCourseAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(updateCourseSuccess(result.data.result));
      yield put(getAllCourse());
    } else {
      yield put(
        updateCourseError(
          'Faild to update course!'
        )
      );
    }
  } catch (error) {
    yield put(updateCourseError('Faild to update course!'));
  }
}

const deleteCourseAsync = async (payload) => {
  return api
    .delete(`/community/course/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};
function* DeleteCourse(payload) {
  try {
    const result = yield call(deleteCourseAsync, payload);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(deleteCourseSuccess(result.data.result));
      yield put(getAllCourse());
    } else {
      yield put(
        deleteCourseError(
          'Faild to delete course!'
        )
      );
    }
  } catch (error) {
    yield put(deleteCourseError('Faild to delete course!'));
  }
}

export function* watchGetAllCourse() {
  yield takeEvery(GET_ALL_COURSE, GetAllCourse);
}
export function* watchCreateCourse() {
  yield takeEvery(CREATE_COURSE, CreateCourse);
}
export function* watchUpdateCourse() {
  yield takeEvery(UPDATE_COURSE, UpdateCourse);
}
export function* watchDeleteCourse() {
  yield takeEvery(DELETE_COURSE, DeleteCourse);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCourse),
    fork(watchCreateCourse),
    fork(watchUpdateCourse),
    fork(watchDeleteCourse),
  ]);
}