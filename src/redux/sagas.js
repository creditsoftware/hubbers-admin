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
import courseStructureSaga from './community/course/courseStructure/saga';

import basicTypeCategorySaga from './options/basic-type-category/saga';
import basicTypeSaga from './options/basic-type/saga';
import expertiseCategorySaga from './options/expertise-category/saga';
import countrySaga from './options/country/saga';
import languageSaga from './options/language/saga';
import languageLevelSaga from './options/language-level/saga';
import hubbersTeamSaga from './hubbers-team/saga';
import jobSaga from './job/job/saga';
import jobCategorySaga from './job/job-category/saga';
import teamSaga from './team/all-teams/saga';
import teamMemberSaga from './team/team-member/saga';
import teamMemberRoleSaga from './team/team-member-role/saga';
import partnerSaga from './partner/partner/saga';
import partnerTypeSaga from './partner/partner-type/saga';
import partnerContactSaga from './partner/partner-contact/saga';
import ModuleTypeSaga from './module/moduleType/saga';
import testimonialsSaga from './testimonials/saga';

import ContestListSaga from './contest/contestList/saga';
import ContestDescriptionSaga from './contest/contestDescription/saga';

export default function* rootSaga(getState) {
  yield all([
    adminSaga(),
    adminRoleSaga(),
    authSagas(),
    userRoleSagas(),
    userSaga(),
    basicTypeCategorySaga(),
    basicTypeSaga(),
    expertiseCategorySaga(),
    communitySaga(),
    eventSaga(),
    topicSaga(),
    memberRoleSaga(),
    memberSaga(),
    postSaga(),
    groupSaga(),
    groupPrivacyOptionSaga(),
    courseStructureSaga(),
    countrySaga(),
    languageSaga(),
    languageLevelSaga(),
    hubbersTeamSaga(),
    jobSaga(),
    jobCategorySaga(),
    teamSaga(),
    teamMemberSaga(),
    teamMemberRoleSaga(),
    partnerSaga(),
    partnerTypeSaga(),
    partnerContactSaga(),
    ModuleTypeSaga(),
    ContestListSaga(),
    testimonialsSaga(),
    ContestDescriptionSaga(),
  ]);
}
