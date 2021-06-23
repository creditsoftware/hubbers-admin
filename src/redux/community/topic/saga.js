import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import { GET_ALL_TOPIC } from '../../types/community/topic';

import { getAllTopicsError, getAllTopicsSuccess } from './actions';

const getAllTopicsAsync = async () => {
  return api
    .get(`/community/topic`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllTopics() {
  try {
    const result = yield call(getAllTopicsAsync);
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(getAllTopicsSuccess(result.data.data));
    } else {
      yield put(getAllTopicsError('Get All Topic Response is not success!'));
    }
  } catch (error) {
    yield put(getAllTopicsError('Get All Topic Error !'));
  }
}

// const getSingleEventAsync = async (payload) => {
//   await api
//     .get(`/community/event/${payload.payload}`)
//     .then((res) => res)
//     .catch((error) => error);
// };

// function* GetSingleEvent(payload) {
//   try {
//     const result = yield call(getSingleEventAsync, payload);
//     if (result.status === 200 && result.statusText === 'OK') {
//       yield put(getSingleEventSuccess(result.data.data));
//     } else {
//       yield put(
//         getSingleEventError('Get Single Event Response is not success!')
//       );
//     }
//   } catch (error) {
//     yield put(getSingleEventError('Get Single Event Error !'));
//   }
// }

// const createEventAsync = async ({ payload }) => {
//   await api
//     .post(`/community/event`, {
//       ...payload,
//     })
//     .then((res) => res)
//     .catch((error) => error);
// };

// function* CreateEvent(payload) {
//   try {
//     const result = yield call(createEventAsync, payload);
//     if (result.status === 200 && result.statusText === 'OK') {
//       yield put(createEventSuccess(result.data.data));
//     } else {
//       yield put(createEventError('Create Event Response is not success!'));
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(createEventError('Create Event Error !'));
//   }
// }

// const updateEventAsync = async ({ payload }) => {
//   await api
//     .put(`/community/event/${payload.id}`, {
//       ...payload,
//     })
//     .then((res) => res)
//     .catch((error) => error);
// };

// function* UpdateEvent(payload) {
//   try {
//     const result = yield call(updateEventAsync, payload);
//     if (result.status === 200 && result.statusText === 'OK') {
//       yield put(updateEventSuccess(result.data.data));
//     } else {
//       yield put(updateEventError('Update Event Response is not success!'));
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(updateEventError('Update Event Error !'));
//   }
// }

export function* watchGetAllTopics() {
  yield takeEvery(GET_ALL_TOPIC, GetAllTopics);
}
// export function* watchCreateEvent() {
//   yield takeEvery(CREATE_EVENT, CreateEvent);
// }
// export function* watchGetSingleEvent() {
//   yield takeEvery(GET_SINGLE_EVENT, GetSingleEvent);
// }
// export function* watchUpdateEvent() {
//   yield takeEvery(UPDATE_EVENT, UpdateEvent);
// }

export default function* rootSaga() {
  yield all([
    fork(watchGetAllTopics),
    // fork(watchGetSingleEvent),
    // fork(watchUpdateEvent),
    // fork(watchCreateEvent),
  ]);
}
