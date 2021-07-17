import {
  CREATE_BASIC_TYPE,
  CREATE_BASIC_TYPE_SUCCESS,
  CREATE_BASIC_TYPE_ERROR,
  GET_ALL_BASIC_TYPE,
  GET_ALL_BASIC_TYPE_SUCCESS,
  GET_ALL_BASIC_TYPE_ERROR,
  UPDATE_BASIC_TYPE,
  UPDATE_BASIC_TYPE_SUCCESS,
  UPDATE_BASIC_TYPE_ERROR,
  DELETE_BASIC_TYPE,
  DELETE_BASIC_TYPE_SUCCESS,
} from '../../types/options/basic-type';

const INIT_STATE = {
  loading: false,
  list: [],
  singleBasicType: null,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_BASIC_TYPE:
      return { ...state, loading: true };

    case CREATE_BASIC_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };

    case CREATE_BASIC_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_BASIC_TYPE:
      return { ...state, loading: true };

    case GET_ALL_BASIC_TYPE_SUCCESS:
      return { ...state, loading: false, list: action.payload };

    case GET_ALL_BASIC_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_BASIC_TYPE:
      return { ...state, loading: true };

    case DELETE_BASIC_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item.id !== action.payload.payload),
      };

    case UPDATE_BASIC_TYPE:
      return { ...state, loading: true };

    case UPDATE_BASIC_TYPE_SUCCESS:
      const foundIndex = state.list.findIndex(
        (x) => x.id === action.payload.id
      );
      state.list[foundIndex] = action.payload;
      return {
        ...state,
        loading: false,
        list: state.list,
      };

    case UPDATE_BASIC_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
