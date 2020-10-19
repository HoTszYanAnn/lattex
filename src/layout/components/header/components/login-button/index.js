import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import queryString from 'query-string';
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import gql from 'graphql-tag'
import { useMutation } from "@apollo/react-hooks";
import { onGqlError } from '../../../../../function';
import { loading, setToken, logout, login } from "../../../../../store/actions/";
import { connect } from "react-redux";
import { APP_PATHS } from '../../../../../config';

const GET_TOKEN_GQL = gql`
  mutation($code: String!) {
    authenticate(code: $code)
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#000000',
    color: 'white',
  },
}));

const LoginButton = ({ history, dispatch, location }) => {
  const classes = useStyles();
  const [token, setToken] = useState();

  const scopes = ['user', 'repo'];
  const scope = scopes.join(',');
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  const onGqlCompleted = (data) => {
    const { authenticate } = data;
    console.log(authenticate)
    if (authenticate) {
      localStorage.setItem("lattex-token", authenticate)
      dispatch(setToken(authenticate));
      history.push()
    } else {
      dispatch(logout());
      history.push()
    }
  };

  const [gqlGetToken, { loading: gqlLoading }] = useMutation(GET_TOKEN_GQL, {
    onCompleted: onGqlCompleted,
    onError: (error) => {
      onGqlError(error);
      history.push()
    },
  });

  useEffect(() => {
    console.log(queryString.parse(location.search).code)
    const code = queryString.parse(location.search).code
    if (code) {
      gqlGetToken({
        variables: {
          code
        }
      });
    }
  }, [])

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


export default withRouter(connect(({ }) => ({}))(LoginButton))