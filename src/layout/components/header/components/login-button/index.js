import React from 'react';
import {
  Button,
  makeStyles,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#000000',
    color: 'white',
  },
}));

const LoginButton = () => {
  const classes = useStyles();

  const scopes = ['user', 'repo'];
  const scope = scopes.join(',');
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  return (
    <Button
      variant="contained"
      className={classes.button}
      href={`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`}
      startIcon={<GitHubIcon />}
    >
      Login with Github
    </Button>
  );
}


export default LoginButton