import React, { useContext, useEffect } from 'react';
import DepartmentContext from '../../context/Departments/departmentContext';
import DepartmentItem from './DepartmentItem';
import AddDepartment from './AddDepartment';
import { Grid, makeStyles } from '@material-ui/core';

const Departments = () => {
  const departmentContext = useContext(DepartmentContext);

  const { loading, departments, getDepartments } = departmentContext;

  useEffect(() => {
    getDepartments();
    //eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {!loading &&
          departments.map(department => (
            <DepartmentItem department={department} key={department.id} />
          ))}
      </Grid>
      <AddDepartment />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '15px'
  }
}));

export default Departments;
