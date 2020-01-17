import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLoggedIn = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
