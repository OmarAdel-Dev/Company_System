import React, { useContext } from 'react';
import EmployeeContext from '../../context/Employees/employeeContext';
import EditEmployee from './EditEmployee';

import { TableCell, TableRow, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const EmployeeItem = ({ employee }) => {
  const { id, firstName, lastName, email, gender, dateOfEmployment } = employee;

  const employeeContext = useContext(EmployeeContext);

  const { deleteEmployee, setCurrent } = employeeContext;

  const onDelete = () => {
    deleteEmployee(id);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="left">{firstName}</TableCell>
      <TableCell align="left">{lastName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{gender}</TableCell>
      <TableCell align="left">{dateOfEmployment}</TableCell>
      <TableCell align="left">
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <span onClick={() => setCurrent(employee)}>
          <EditEmployee />
        </span>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeItem;
