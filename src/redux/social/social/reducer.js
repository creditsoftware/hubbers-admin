import {
  GET_ALL_SOCIAL,
  GET_ALL_SOCIAL_SUCCESS,
  GET_ALL_SOCIAL_ERROR,
} from '../../types/social/social';

const INIT_STATE = {
  loading: false,
  socialList: [],
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_SOCIAL:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        socialList: action.payload,
      };
    case GET_ALL_SOCIAL_ERROR:
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
