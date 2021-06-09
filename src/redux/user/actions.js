import { CREATE_USER, GET_ALL_USER, GET_USER, UPDATE_USER, DELETE_USER, GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR, GET_USER_SUCCESS, GET_USER_ERROR } from '../types/user';

export const getAllUsers = () => ({
  type: GET_ALL_USER
});

export const getAllUsersSuccess = (data) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: data,
});

export const getAllUsersError = (data) => ({
  type: GET_ALL_USER_ERROR,
  payload: data,
});



export const getSingleUser = (id) => ({
  type: GET_USER,
  payload: id
})

export const getUsersSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUsersError = (data) => ({
  type: GET_USER_ERROR,
  payload: data,
});



