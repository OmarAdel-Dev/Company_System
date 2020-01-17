import React, { useEffect, useContext } from 'react';
import EmployeeContext from '../../context/Employees/employeeContext';
import DepartmentContext from '../../context/Departments/departmentContext';
import AddEmployee from './AddEmployee';
import EmployeeItem from './EmployeeItem';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';

const Employees = ({ match }) => {
  const employeeContext = useContext(EmployeeContext);
  const departmentContext = useContext(DepartmentContext);

  const { employees, loading, getEmployees } = employeeContext;

  const { departments } = departmentContext;

  const depData = {
    DepartmentName: departments[match.params.id - 1].departmentName,
    DepartmentID: match.params.id
  };
  useEffect(() => {
    getEmployees();
    //eslint-disable-next-line
  }, []);
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {depData.DepartmentName} Department
        </Typography>
        <Table className={classes.table} aria-label="Employees">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Date OF Employment</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              employees.map(
                employee =>
                  employee.departmentId === depData.DepartmentID && (
                    <EmployeeItem key={employee.id} employee={employee} />
                  )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddEmployee department={depData} />
    </div>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    marginTop: '15px'
  },
  title: {
    paddingLeft: '15px'
  }
});

export default Employees;
