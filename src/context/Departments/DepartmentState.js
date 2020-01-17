import React, { useReducer } from 'react';
import DepartmentContext from './departmentContext';
import DepartmentReducer from './departmentReducer';

import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  DEPARTMENTS_ERROR,
  SET_LOADING
} from '../types';

const DepartmentState = props => {
  const initialState = {
    departments: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(DepartmentReducer, initialState);

  // Get Departments

  const getDepartments = async () => {
    try {
      setLoading();
      const res = await fetch('/departments');
      const data = await res.json();

      dispatch({
        type: GET_DEPARTMENTS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: DEPARTMENTS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Add Department

  const addDepartment = async department => {
    try {
      setLoading();
      const res = await fetch('/departments', {
        method: 'POST',
        body: JSON.stringify(department),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: ADD_DEPARTMENTS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: DEPARTMENTS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Delete Department

  const deleteDepartment = async id => {
    try {
      setLoading();
      await fetch(`/departments/${id}`, { method: 'DELETE' });

      dispatch({
        type: DELETE_DEPARTMENTS,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: DEPARTMENTS_ERROR,
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
    <DepartmentContext.Provider
      value={{
        departments: state.departments,
        loading: state.loading,
        error: state.error,
        getDepartments,
        addDepartment,
        deleteDepartment
      }}
    >
      {props.children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentState;
