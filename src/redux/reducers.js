import { combineReducers } from 'redux';
import settings from './settings/reducer';
import communityAll from './community/all/reducer';
import event from './community/event/reducer';
import topic from './community/topic/reducer';
import memberRole from './community/memberRole/reducer';
import member from './community/member/reducer';
import post from './community/post/reducer';
import group from './community/group/reducer';
import groupPrivacyOption from './community/groupPrivacyOption/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import userRole from './user-role/reducer';
import users from './user/reducer';
import admins from './admin/reducer';
import adminRole from './admin-role/reducer';
import basicTypeCategory from './options/basic-type-category/reducer';
import basicType from './options/basic-type/reducer';
import expertiseCategory from './options/expertise-category/reducer';
import country from './options/country/reducer';
import hubbersTeam from './hubbers-team/reducer';

const reducers = combineReducers({
  menu,
  settings,
  admins,
  adminRole,
  authUser,
  userRole,
  users,
  event,
  topic,
  memberRole,
  member,
  post,
  group,
  groupPrivacyOption,
  // options
  basicTypeCategory,
  basicType,
  expertiseCategory,
  country,
  communityAll,
  hubbersTeam,
});

export default reducers;
