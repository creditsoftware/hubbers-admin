import {
  CREATE_INNOVATION_TYPE,
  CREATE_INNOVATION_TYPE_SUCCESS,
  CREATE_INNOVATION_TYPE_ERROR,
  GET_ALL_INNOVATION_TYPES,
  GET_INNOVATION_TYPE,
  UPDATE_INNOVATION_TYPE,
  DELETE_INNOVATION_TYPE
} from '../../types/options/innovation-type';

const INIT_STATE = {
  loading: false,
  nnovationTypeData: [],
  singleInnovationType: null,
  error: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_INNOVATION_TYPE: 
      return {...state, loading: true}
    case 
    case GET_ALL_INNOVATION_TYPES:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
