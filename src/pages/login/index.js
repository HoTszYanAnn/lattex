import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
  Link,
  Checkbox,
  Button,
  FormControlLabel,
  Typography, 
  Container,
  makeStyles, 
} from '@material-ui/core';
import { RegForm, RequestForm } from './components';


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
    margin: theme.spacing(2, 20, 2),
  },
}));

const Login = () => {
const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleForgot = () => {

  };
  const handleReg = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Container component="main" maxWidth="xs">
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
              <Link variant="body2" onClick={handleForgot}>
                  Forgot password?
              </Link>
          </Grid>
          <Grid item>
              <Link variant="body2" onClick={handleReg}>
                  Register
              </Link>
          </Grid>
        </Grid>
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Login
        </Button>
      </form>
      </div>
    </Container>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
    <DialogContent>
      <RegForm/>
    </DialogContent>
      
    </Dialog>
  </div>  
  );
}

export default Login;