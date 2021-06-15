import {
    CREATE_PRODUCT_TYPE,
    CREATE_PRODUCT_TYPE_SUCCESS,
    CREATE_PRODUCT_TYPE_ERROR,

    GET_ALL_PRODUCT_TYPES,
    GET_ALL_PRODUCT_TYPES_SUCCESS,
    GET_ALL_PRODUCT_TYPES_ERROR
  } from '../../types/options/product-type';
  
  const INIT_STATE = {
    loading: false,
    productTypeData: [],
    singleProductType: null,
    error: '',
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_TYPE:
        return { ...state, loading: true };
  
      case CREATE_PRODUCT_TYPE_SUCCESS:
        return {
          ...state,
          loading: false,
          productTypeData: [...state.productTypeData, action.payload],
        };
  
      case CREATE_PRODUCT_TYPE_ERROR:
        return { ...state, loading: false, error: action.payload };
  
      case GET_ALL_PRODUCT_TYPES:
        return { ...state, loading: true };
  
      case GET_ALL_PRODUCT_TYPES_SUCCESS:
        return { ...state, loading: false, productTypeData: action.payload };
  
      case GET_ALL_PRODUCT_TYPES_ERROR:
        return { ...state, loading: false, error: action.payload };
  
    //   case DELETE_INNOVATION_TYPE:
    //     return { ...state, loading: true };
  
    //   case DELETE_INNOVATION_TYPE_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       productTypeData: state.productTypeData.filter(
    //         (item) => item.id !== action.payload.payload
    //       ),
    //     };
  
    //   case GET_ALL_INNOVATION_TYPES_ERROR:
    //     return { ...state, loading: false, error: action.payload };
  
    //   case UPDATE_INNOVATION_TYPE:
    //     return { ...state, loading: true };
  
    //   case UPDATE_INNOVATION_TYPE_SUCCESS:
    //     const foundIndex = state.productTypeData.findIndex(x => x.id === action.payload.id)
    //     state.productTypeData[foundIndex] = action.payload
    //     return { ...state, loading: false, productTypeData: state.productTypeData};
  
    //   case UPDATE_INNOVATION_TYPE_ERROR:
    //     return { ...state, loading: false, error: action.payload };
  
  
      default:
        return { ...state };
    }
  };
  