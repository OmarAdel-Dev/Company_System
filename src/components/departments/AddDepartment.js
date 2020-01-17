import React, { useContext, useState } from 'react';
import DepartmentContext from '../../context/Departments/departmentContext';

import AddIcon from '@material-ui/icons/Add';
import {
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles
} from '@material-ui/core';

export default function AddDepartment() {
  const departmentContext = useContext(DepartmentContext);

  const { addDepartment } = departmentContext;

  const [department, setDepartment] = useState({
    departmentName: '',
    description: ''
  });

  const { departmentName, description } = department;

  const onChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //Add
    addDepartment(department);
    // Clear
    setDepartment({
      departmentName: '',
      description: ''
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
        <DialogTitle id="form-dialog-title">Add a Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Deparment Name"
            type="text"
            name="departmentName"
            value={departmentName}
            onChange={onChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Deparment Description"
            type="text"
            name="description"
            value={description}
            onChange={onChange}
            fullWidth
          />
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
