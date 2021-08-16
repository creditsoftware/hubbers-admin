/* eslint-disable import/no-cycle */
/* SETTINGS */
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

/* MENU */
export const MENU_SET_CLASSNAMES = 'MENU_SET_CLASSNAMES';
export const MENU_CONTAINER_ADD_CLASSNAME = 'MENU_CONTAINER_ADD_CLASSNAME';
export const MENU_CLICK_MOBILE_MENU = 'MENU_CLICK_MOBILE_MENU';
export const MENU_CHANGE_DEFAULT_CLASSES = 'MENU_CHANGE_DEFAULT_CLASSES';
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  'MENU_CHANGE_HAS_SUB_ITEM_STATUS';

export * from './menu/actions';
export * from './settings/actions';
export * from './auth/actions';
export * from './admin/actions';
export * from './admin-role/actions';
export * from './user-role/actions';
export * from './user/actions';
export * from './community/all/actions';
export * from './community/event/actions';
export * from './community/topic/actions';
export * from './community/memberRole/actions';
export * from './community/member/actions';
export * from './community/post/actions';
export * from './community/group/actions';
export * from './community/groupPrivacyOption/actions';
export * from './community/course/courseStructure/actions';
export * from './options/basic-type-category/actions';
export * from './options/basic-type/actions';
export * from './options/expertise-category/actions';
export * from './options/country/actions';
export * from './options/language/actions';
export * from './options/language-level/actions';
export * from './hubbers-team/actions';
export * from './job/job/actions';
export * from './job/job-category/actions';
export * from './team/all-teams/actions';
export * from './team/team-member/actions';
export * from './team/team-member-role/actions';
export * from './partner/partner/actions';
export * from './partner/partner-type/actions';
export * from './partner/partner-contact/actions';
export * from './module/moduleType/actions';

export * from './contest/contestDescription/actions';