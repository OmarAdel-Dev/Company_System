import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  DEPARTMENTS_ERROR,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        loading: false
      };
    case ADD_DEPARTMENTS:
      return {
        ...state,
        departments: [...state.departments, action.payload],
        loading: false
      };
    case DELETE_DEPARTMENTS:
      return {
        ...state,
        departments: state.departments.filter(
          department => department.id !== action.payload
        ),
        loading: false
      };
    case DEPARTMENTS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
