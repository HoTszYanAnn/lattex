import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Typography, 
  Container,
  makeStyles, 
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub'; 
import TYPES from '../../store/actions/types';

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

const Login = () => {
  const classes = useStyles();
  const [token, setToken] = useState();

  const scopes = ['user', 'repo'];
  const scope = scopes.join(',');
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const proxy_url = process.env.REACT_APP_PROXY_URL;

  const url = window.location.href;
  const hasCode = url.includes("?code=");
  if (hasCode) {
    const newUrl = url.split("?code=");
    fetch(proxy_url, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        redirect_uri: redirect_uri,
        client_secret: client_secret,
        code: newUrl[1],
      }),
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

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

export default Login