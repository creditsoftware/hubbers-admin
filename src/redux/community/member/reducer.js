import {
  CREATE_MEMBER,
  CREATE_MEMBER_ERROR,
  GET_ALL_MEMBER,
  GET_ALL_MEMBER_ERROR,
  GET_ALL_MEMBER_SUCCESS,
  UPDATE_MEMBER,
  UPDATE_MEMBER_ERROR,
  DELETE_MEMBER,
  DELETE_MEMBER_ERROR,
  DELETE_MEMBER_SUCCESS,
} from '../../types/community/member';

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_MEMBER:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_ALL_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case CREATE_MEMBER:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_MEMBER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MEMBER:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_MEMBER_ERROR:
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
