import {
  GET_ALL_TOPIC,
  GET_ALL_TOPIC_SUCCESS,
  GET_ALL_TOPIC_ERROR,
} from '../../types/community/topic';

export const getAllTopics = () => ({
  type: GET_ALL_TOPIC,
});
export const getAllTopicsSuccess = (data) => ({
  type: GET_ALL_TOPIC_SUCCESS,
  payload: data,
});

export const getAllTopicsError = (data) => ({
  type: GET_ALL_TOPIC_ERROR,
  payload: data,
});

// export const getSingleEvent = (data) => ({
//   type: GET_SINGLE_EVENT,
//   payload: data,
// });
// export const getSingleEventSuccess = (data) => ({
//   type: GET_SINGLE_EVENT_SUCCESS,
//   payload: data,
// });

// export const getSingleEventError = (data) => ({
//   type: GET_SINGLE_EVENT_ERROR,
//   payload: data,
// });

// export const createEvent = (data) => ({
//   type: CREATE_EVENT,
//   payload: data,
// });
// export const createEventSuccess = (data) => ({
//   type: CREATE_EVENT_SUCCESS,
//   payload: data,
// });

// export const createEventError = (data) => ({
//   type: CREATE_EVENT_ERROR,
//   payload: data,
// });

// export const updateEvent = (data) => ({
//   type: UPDATE_EVENT,
//   payload: data,
// });
// export const updateEventSuccess = (data) => ({
//   type: UPDATE_EVENT_SUCCESS,
//   payload: data,
// });

// export const updateEventError = (data) => ({
//   type: UPDATE_EVENT_ERROR,
//   payload: data,
// });
