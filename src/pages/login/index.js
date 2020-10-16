import React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox, 
  Link, 
  Grid, 
  Box, 
  LockOutlinedIcon,
  Typography, 
  Container,
  makeStyles, 
  createMuiTheme,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Lättex
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Register
              </Link>
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <div fullWidth
               align="center"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login