import {
  GET_ALL_SOCIAL,
  GET_ALL_SOCIAL_SUCCESS,
  GET_ALL_SOCIAL_ERROR,
} from '../../types/social/social';

export const getAllSocial = () => ({
  type: GET_ALL_SOCIAL,
});
export const getAllSocialSuccess = (data) => ({
  type: GET_ALL_SOCIAL_SUCCESS,
  payload: data,
});
export const getAllSocialError = (data) => ({
  type: GET_ALL_SOCIAL_ERROR,
  payload: data,
});
