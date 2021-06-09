import {
    CREATE_INNOVATION_TYPE,
    CREATE_INNOVATION_TYPE_SUCCESS,
    CREATE_INNOVATION_TYPE_ERROR,
    GET_ALL_INNOVATION_TYPES,
    GET_INNOVATION_TYPE,
    UPDATE_INNOVATION_TYPE,
    DELETE_INNOVATION_TYPE
} from '../../types/options/innovation-type';

export const getAllUsers = () => ({
    type: GET_ALL_INNOVATION_TYPES
});

// export const getAllUsersSuccess = (data) => ({
//     type: GET_ALL_USER_SUCCESS,
//     payload: data,
// });

// export const getAllUsersError = (data) => ({
//     type: GET_ALL_USER_ERROR,
//     payload: data,
// });

export const createInnovationType = (values) => ({
    type: CREATE_INNOVATION_TYPE,
    payload: values
})

export const createInnovationTypeSuccess = (data) => ({
    type: CREATE_INNOVATION_TYPE_SUCCESS,
    payload: data
})

export const createInnovationTypeError = (message) => ({
    type: CREATE_INNOVATION_TYPE_ERROR,
    payload: message
})
  






