import { combineReducers } from 'redux';
import settings from './settings/reducer';
import communityAll from './community/all/reducer';
import event from './community/event/reducer';
import topic from './community/topic/reducer';
import memberRole from './community/memberRole/reducer';
import member from './community/member/reducer';
import post from './community/post/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import userRole from './user-role/reducer';
import users from './user/reducer';

import innovationType from './options/innovation-type/reducer';
import productionType from './options/product-type/reducer';
import country from './options/country/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  userRole,
  users,
  event,
  topic,
  memberRole,
  member,
  post,
  // options
  innovationType,
  productionType,
  country,
  communityAll,
});

export default reducers;
