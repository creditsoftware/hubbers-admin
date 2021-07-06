/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userRoleSagas from './user-role/saga';
import userSaga from './user/saga';
import communitySaga from './community/all/saga';
import eventSaga from './community/event/saga';
import topicSaga from './community/topic/saga';
import memberRoleSaga from './community/memberRole/saga';
import memberSaga from './community/member/saga';
import postSaga from './community/post/saga';

import adminSaga from './admin/saga';
import adminRoleSaga from './admin-role/saga';
import groupSaga from './community/group/saga';
import groupPrivacyOptionSaga from './community/groupPrivacyOption/saga';

import innovationTypeSaga from './options/innovation-type/saga';
import productTypeSaga from './options/product-type/saga';
import countrySaga from './options/country/saga';
import hubbersTeam from './hubbers-team/saga';

export default function* rootSaga(getState) {
  yield all([
    adminSaga(),
    adminRoleSaga(),
    authSagas(),
    userRoleSagas(),
    userSaga(),
    innovationTypeSaga(),
    productTypeSaga(),
    communitySaga(),
    eventSaga(),
    topicSaga(),
    memberRoleSaga(),
    memberSaga(),
    postSaga(),
    groupSaga(),
    groupPrivacyOptionSaga(),
    countrySaga(),
    hubbersTeam(),
  ]);
}
