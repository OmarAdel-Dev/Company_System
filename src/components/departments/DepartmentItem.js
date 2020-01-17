import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DepartmentContext from '../../context/Departments/departmentContext';

import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';

const DepartmentItem = ({ department }) => {
  const departmentContext = useContext(DepartmentContext);

  const { deleteDepartment } = departmentContext;

  const { id, departmentName, description } = department;

  const onDelete = () => {
    deleteDepartment(id);
  };

  const classes = Styles();
  return (
    <Grid item xs={4}>
      <Card color="">
        <CardContent>
          <IconButton
            aria-label="delete"
            onClick={onDelete}
            className={classes.DeleteIcon}
          >
            <DeleteIcon />
          </IconButton>
          <Typography gutterBottom color="primary">
            {departmentName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link style={{ textDecoration: 'none' }} to={`/department/${id}`}>
            <Button size="small">View Employees</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Styles = makeStyles(theme => ({
  DeleteIcon: {
    float: 'right'
  }
}));

export default DepartmentItem;
