import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import userRole from './user-role/reducer';
import users from './user/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  userRole,
  users
});

export default reducers;
