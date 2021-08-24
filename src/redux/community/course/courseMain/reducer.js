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

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_COURSE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_ALL_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
