import React, { useReducer } from 'react';
import EmployeeContext from './employeeContext';
import EmployeeReducer from './employeeReducer';

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEES,
  DELETE_EMPLOYEES,
  EMPLOYEES_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  UPDATE_EMPLOYEES
} from '../types';

const EmployeeState = props => {
  const initialState = {
    employees: [],
    current: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(EmployeeReducer, initialState);

  // Get Employees

  const getEmployees = async () => {
    try {
      setLoading();
      const res = await fetch('/employees');
      const data = await res.json();

      dispatch({
        type: GET_EMPLOYEES,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEES_ERROR,
        payload: err.response.data
      });
    }
  };

  // Add Employee

  const addEmployee = async employee => {
    try {
      setLoading();
      const res = await fetch('/employees', {
        method: 'POST',
        body: JSON.stringify(employee),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: ADD_EMPLOYEES,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEES_ERROR,
        payload: err.response.data
      });
    }
  };

  // Delete Employee

  const deleteEmployee = async id => {
    try {
      setLoading();
      await fetch(`/employees/${id}`, { method: 'DELETE' });

      dispatch({
        type: DELETE_EMPLOYEES,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEES_ERROR,
        payload: err.response.data
      });
    }
  };

  // Set current
  const setCurrent = employee => {
    dispatch({ type: SET_CURRENT, payload: employee });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Employee
  const updateEmployee = async employee => {
    try {
      const res = await fetch(`/employees/${employee.id}`, {
        method: 'PUT',
        body: JSON.stringify(employee),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: UPDATE_EMPLOYEES,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEES_ERROR,
        payload: err.response.data
      });
    }
  };

  // Set Loading

  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
