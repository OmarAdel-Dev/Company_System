import React, { useContext, useState } from 'react';
import EmployeeContext from '../../context/Employees/employeeContext';

import AddIcon from '@material-ui/icons/Add';
import {
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel
} from '@material-ui/core';

export default function AddEmployee({ department }) {
  const employeeContext = useContext(EmployeeContext);

  const { addEmployee } = employeeContext;

  const { DepartmentName, DepartmentID } = department;

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: ''
  });

  const { firstName, lastName, email, gender } = employee;

  const onChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //Add
    addEmployee(
      employee,
      (employee.dateOfEmployment = new Date().toLocaleString().split(',')[0]),
      (employee.department = DepartmentName),
      (employee.departmentId = DepartmentID)
    );
    // Clear
    setEmployee({
      firstName: '',
      lastName: '',
      email: '',
      gender: ''
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = Styles();

  return (
    <div>
      <Fab color="primary" onClick={handleClickOpen} className={classes.fab}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add an Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            fullWidth
          />
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={onChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Styles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));
