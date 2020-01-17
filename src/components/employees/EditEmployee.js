import React, { useContext, useState, useEffect } from 'react';
import EmployeeContext from '../../context/Employees/employeeContext';

import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  IconButton
} from '@material-ui/core';

export default function EditEmployee() {
  const employeeContext = useContext(EmployeeContext);

  const { current, updateEmployee } = employeeContext;

  useEffect(() => {
    if (current !== null) {
      setEmployee(current);
    } else {
      setEmployee({
        firstName: '',
        lastName: '',
        email: '',
        gender: ''
      });
    }
    //eslint-disable-next-line
  }, [employeeContext, current]);

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
    //Update
    if (current !== null) updateEmployee(employee);

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

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Employee Data</DialogTitle>
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
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={onChange}
            align="left"
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
