import React from 'react';
import {
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#000000',
    color: 'white',
    writingMode: 'vertical-rl',
    textOrientation: 'sideways',
    transform: 'rotate(-180deg)',
  },
  text: {
    display: 'grid',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const LoginButton = () => {
  const classes = useStyles();

  const scopes = ['user', 'repo', 'delete_repo'];
  const scope = scopes.join(',');
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REACT_URL;

  return (
    <Button
      variant="contained"
      className={classes.button}
      href={`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`}
    >
      
        <span className={classes.text}><GitHubIcon style={{transform: 'rotate(90deg)'}} fontSize="small"/></span>
        <Box mb={1}/>
        <span>Login with Github</span>
    </Button>
  );
}


export default LoginButton