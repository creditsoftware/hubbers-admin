import {
  CREATE_INNOVATION_TYPE,
  CREATE_INNOVATION_TYPE_SUCCESS,
  CREATE_INNOVATION_TYPE_ERROR,
  GET_ALL_INNOVATION_TYPES,
  GET_ALL_INNOVATION_TYPES_SUCCESS,
  GET_ALL_INNOVATION_TYPES_ERROR,
  GET_INNOVATION_TYPE,
  UPDATE_INNOVATION_TYPE,
  DELETE_INNOVATION_TYPE,
  DELETE_INNOVATION_TYPE_SUCCESS,
  DELETE_INNOVATION_TYPE_ERROR,
} from '../../types/options/innovation-type';

const INIT_STATE = {
  loading: false,
  innovationTypeData: [],
  singleInnovationType: null,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_INNOVATION_TYPE:
      return { ...state, loading: true };

    case CREATE_INNOVATION_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        innovationTypeData: [...state.innovationTypeData, action.payload],
      };

    case CREATE_INNOVATION_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_INNOVATION_TYPES:
      return { ...state, loading: true };

    case GET_ALL_INNOVATION_TYPES_SUCCESS:
      return { ...state, loading: false, innovationTypeData: action.payload };

    case GET_ALL_INNOVATION_TYPES_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_INNOVATION_TYPE:
      return { ...state, loading: true };

    case DELETE_INNOVATION_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        innovationTypeData: state.innovationTypeData.filter(
          (item) => item.id !== action.payload.payload
        ),
      };

    case GET_ALL_INNOVATION_TYPES_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
