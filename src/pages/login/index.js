import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { connect } from "react-redux";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(10),
    backgroundColor: '#000000',
    color: 'white',
  },
}));

const Login = ({ history, dispatch, location }) => {
  const classes = useStyles();
  const [token, setToken] = useState();

  const scopes = ['user', 'repo'];
  const scope = scopes.join(',');
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Lättex
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          href={`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`}
          startIcon={<GitHubIcon />}
        >
          Login with Github
        </Button>
      </div>
    </Container>
  );
}


export default withRouter(connect(({}) => ({}))(Login))