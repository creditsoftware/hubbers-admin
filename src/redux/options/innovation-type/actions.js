import {
    CREATE_INNOVATION_TYPE,
    CREATE_INNOVATION_TYPE_SUCCESS,
    CREATE_INNOVATION_TYPE_ERROR,
    GET_ALL_INNOVATION_TYPES,
    GET_ALL_INNOVATION_TYPES_SUCCESS,
    GET_ALL_INNOVATION_TYPES_ERROR,
    GET_INNOVATION_TYPE,
    UPDATE_INNOVATION_TYPE,
    UPDATE_INNOVATION_TYPE_SUCCESS,
    UPDATE_INNOVATION_TYPE_ERROR,

    DELETE_INNOVATION_TYPE,
    DELETE_INNOVATION_TYPE_SUCCESS,
    DELETE_INNOVATION_TYPE_ERROR
} from '../../types/options/innovation-type';

// getAll
export const getAllInnovationTypes = () => ({
  type: GET_ALL_INNOVATION_TYPES,
});

export const getAllInnovationTypesSuccess = (data) => ({
  type: GET_ALL_INNOVATION_TYPES_SUCCESS,
  payload: data,
});

export const getAllInnovationTypesError = (data) => ({
  type: GET_ALL_INNOVATION_TYPES_ERROR,
  payload: data,
});

// create
export const createInnovationType = (values) => ({
  type: CREATE_INNOVATION_TYPE,
  payload: values,
});

export const createInnovationTypeSuccess = (data) => ({
  type: CREATE_INNOVATION_TYPE_SUCCESS,
  payload: data,
});

export const createInnovationTypeError = (message) => ({
  type: CREATE_INNOVATION_TYPE_ERROR,
  payload: message,
});

// delete
export const deleteInnovationType = (id) => ({
  type: DELETE_INNOVATION_TYPE,
  payload: id,
});

export const deleteInnovationTypeSuccess = (data) => ({
  type: DELETE_INNOVATION_TYPE_SUCCESS,
  payload: data,
});

export const deleteInnovationTypeError = (data) => ({
    type: DELETE_INNOVATION_TYPE_ERROR,
    payload: data
})

//update
export const updateInnovationType = (data) => ({
    type: UPDATE_INNOVATION_TYPE,
    payload: data
})

export const updateInnovationTypeSuccess = (data) => ({
    type: UPDATE_INNOVATION_TYPE_SUCCESS,
    payload: data
})

export const updateInnovationTypeError = (data) => ({
    type: UPDATE_INNOVATION_TYPE_ERROR,
    payload: data
})
  






