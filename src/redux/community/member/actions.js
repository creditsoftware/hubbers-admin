import {
  CREATE_MEMBER,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS,
  GET_ALL_MEMBER,
  GET_ALL_MEMBER_ERROR,
  GET_ALL_MEMBER_SUCCESS,
  UPDATE_MEMBER,
  UPDATE_MEMBER_ERROR,
  UPDATE_MEMBER_SUCCESS,
} from '../../types/community/member';

export const getAllMember = () => ({
  type: GET_ALL_MEMBER,
});
export const getAllMemberSuccess = (data) => ({
  type: GET_ALL_MEMBER_SUCCESS,
  payload: data,
});

export const getAllMemberError = (data) => ({
  type: GET_ALL_MEMBER_ERROR,
  payload: data,
});

// export const getSingleEvent = (data) => ({
//   type: GET_SINGLE_EVENT,
//   payload: data,
// });
// export const getSingleEventSuccess = (data) => ({
//   type: GET_SINGLE_EVENT_SUCCESS,
//   payload: data,
// });

// export const getSingleEventError = (data) => ({
//   type: GET_SINGLE_EVENT_ERROR,
//   payload: data,
// });

export const createMember = (data) => ({
  type: CREATE_MEMBER,
  payload: data,
});
export const createMemberSuccess = (data) => ({
  type: CREATE_MEMBER_SUCCESS,
  payload: data,
});

export const createMemberError = (data) => ({
  type: CREATE_MEMBER_ERROR,
  payload: data,
});

export const updateMember = (data) => ({
  type: UPDATE_MEMBER,
  payload: data,
});
export const updateMemberSuccess = (data) => ({
  type: UPDATE_MEMBER_SUCCESS,
  payload: data,
});

export const updateMemberError = (data) => ({
  type: UPDATE_MEMBER_ERROR,
  payload: data,
});
