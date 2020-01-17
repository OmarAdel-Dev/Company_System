import React, { useState, useEffect, useContext } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthContext from '../../context/auth/authContext';

const SignIn = props => {
  const authContext = useContext(AuthContext);

  const { login, error, isAuthenticated, loading } = authContext;

  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error !== null) {
      setOpen(true);
    }
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {open && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message="Invalid Credentials"
        />
      )}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {loading && <CircularProgress className={classes.buttonProgress} />}
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        The Task
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    position: 'absolute',
    marginTop: 100,
    marginLeft: -210
  }
}));

export default SignIn;
