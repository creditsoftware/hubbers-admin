import {
  CREATE_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT_TYPE_ERROR,
  GET_ALL_PRODUCT_TYPES,
  GET_ALL_PRODUCT_TYPES_SUCCESS,
  GET_ALL_PRODUCT_TYPES_ERROR,
} from '../../types/options/product-type';

// create
export const createProductionType = (values) => ({
  type: CREATE_PRODUCT_TYPE,
  payload: values,
});

export const createProductTypeSuccess = (data) => ({
  type: CREATE_PRODUCT_TYPE_SUCCESS,
  payload: data,
});

export const createProductTypeError = (data) => ({
  type: CREATE_PRODUCT_TYPE_ERROR,
  payload: data,
});

// get all
export const getAllProductTypes = () => ({
  type: GET_ALL_PRODUCT_TYPES,
});

export const getAllProductTypesSuccess = (data) => ({
  type: GET_ALL_PRODUCT_TYPES_SUCCESS,
  payload: data,
});

export const getAllProductTypesError = (data) => ({
  type: GET_ALL_PRODUCT_TYPES_ERROR,
  payload: data,
});
