import { combineReducers } from 'redux';
import settings from './settings/reducer';
import communityAll from './community/all/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import userRole from './user-role/reducer';
import users from './user/reducer';

import innovationType from './options/innovation-type/reducer';
import productionType from './options/product-type/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  userRole,
  users,
  // options
  innovationType,
  productionType,
  communityAll,
});

export default reducers;
