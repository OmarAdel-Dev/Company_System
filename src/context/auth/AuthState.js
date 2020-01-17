import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  LOGOUT
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register a User

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      setLoading();
      const res = await axios.post('/register', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      setLoading();
      const res = await axios.post('/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout User
  const logout = () => dispatch({ type: LOGOUT });

  // Set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        setLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
