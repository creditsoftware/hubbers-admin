import {
  GET_ALL_COURSE,
  GET_ALL_COURSE_SUCCESS,
  GET_ALL_COURSE_ERROR,
  CREATE_COURSE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_ERROR,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_ERROR,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_ERROR,
} from '../../../types/community/course/main';

export const getAllCourse = () => ({
  type: GET_ALL_COURSE,
});
export const getAllCourseSuccess = (data) => ({
  type: GET_ALL_COURSE_SUCCESS,
  payload: data,
});
export const getAllCourseError = (data) => ({
  type: GET_ALL_COURSE_ERROR,
  payload: data,
});

export const createCourse = (data) => ({
  type: CREATE_COURSE,
  payload: data,
});
export const createCourseSuccess = (data) => ({
  type: CREATE_COURSE_SUCCESS,
  payload: data,
});
export const createCourseError = (data) => ({
  type: CREATE_COURSE_ERROR,
  payload: data,
});

export const updateCourse = (data) => ({
  type: UPDATE_COURSE,
  payload: data,
});
export const updateCourseSuccess = (data) => ({
  type: UPDATE_COURSE_SUCCESS,
  payload: data,
});
export const updateCourseError = (data) => ({
  type: UPDATE_COURSE_ERROR,
  payload: data,
});

export const deleteCourse = (data) => ({
  type: DELETE_COURSE,
  payload: data,
});
export const deleteCourseSuccess = (data) => ({
  type: DELETE_COURSE_SUCCESS,
  payload: data,
});
export const deleteCourseError = (data) => ({
  type: DELETE_COURSE_ERROR,
  payload: data,
});
