import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Appbar from './components/layouts/AppBar';
import Departments from './components/departments/Departments';
import Employees from './components/employees/Employees';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container } from '@material-ui/core';

import DepartmentState from './context/Departments/DepartmentState';
import EmployeeState from './context/Employees/EmployeeState';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <AuthState>
        <DepartmentState>
          <EmployeeState>
            <Router>
              <Appbar title={'The Task'} />
              <Container>
                <Switch>
                  <PrivateRoute exact path="/" component={Departments} />
                  <PrivateRoute
                    exact
                    path="/department/:id"
                    component={Employees}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </Container>
            </Router>
          </EmployeeState>
        </DepartmentState>
      </AuthState>
    </MuiThemeProvider>
  );
}

export default App;
