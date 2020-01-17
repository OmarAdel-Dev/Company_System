import {
  GET_EMPLOYEES,
  ADD_EMPLOYEES,
  DELETE_EMPLOYEES,
  EMPLOYEES_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EMPLOYEES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false
      };
    case ADD_EMPLOYEES:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false
      };
    case DELETE_EMPLOYEES:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee.id !== action.payload
        ),
        loading: false
      };
    case UPDATE_EMPLOYEES:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        ),
        loading: false
      };
    case EMPLOYEES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
