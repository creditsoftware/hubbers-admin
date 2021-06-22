import {
  GET_ALL_COMMUNITY,
  GET_ALL_COMMUNITY_SUCCESS,
  GET_ALL_COMMUNITY_ERROR,
  GET_SINGLE_COMMUNITY,
  GET_SINGLE_COMMUNITY_SUCCESS,
  GET_SINGLE_COMMUNITY_ERROR,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  UPDATE_COMMUNITY,
  UPDATE_COMMUNITY_SUCCESS,
  UPDATE_COMMUNITY_ERROR,
} from '../../types/community/community-all';

const INIT_STATE = {
  loading: false,
  community: [],
  singlecommunity: null,
  newCommunity: null,
  updateCommunity: null,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_COMMUNITY:
      return { ...state, loading: true };
    case GET_ALL_COMMUNITY_SUCCESS:
      return { ...state, loading: false, community: action.payload };
    case GET_ALL_COMMUNITY_ERROR:
      return {
        ...state,
        loading: false,
        community: [],
        error: action.payload,
      };
    case GET_SINGLE_COMMUNITY:
      return { ...state, loading: true };
    case GET_SINGLE_COMMUNITY_SUCCESS:
      return { ...state, loading: false, singleCommunity: action.payload };
    case GET_SINGLE_COMMUNITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COMMUNITY:
      return { ...state, loading: true };
    case CREATE_COMMUNITY_SUCCESS:
      return { ...state, loading: false, newCommunity: action.payload };
    case CREATE_COMMUNITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COMMUNITY:
      return { ...state, loading: true };
    case UPDATE_COMMUNITY_SUCCESS:
      return { ...state, loading: false, updateCommunity: action.payload };
    case UPDATE_COMMUNITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
