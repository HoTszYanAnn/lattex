import React, { Suspense, lazy, useEffect, useState } from "react";
import {  HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { APP_PATHS } from "./config";

import HomePage from './pages/home'
import ProjectListPage from './pages/project-list'

import EditorPage from './pages/editor'

import { MainLayout, noPaddingLayout, HomeLayout, EditorNavLayout } from "./layout"
import ErrorBoundary from "./components/error-boundary";
import { loading, setToken, logout, login } from "./store/actions/";
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { onGqlError } from './function';
import queryString from 'query-string';


const GET_TOKEN_GQL = gql`
  mutation($code: String!) {
    authenticate(code: $code)
  }
`;

const GET_PROFILE_GQL = gql`
  query {
    me {
      avatarUrl
      name
    }
  }
`;

const withLayout = (Layout) => (Component) => (props) => (
  <ErrorBoundary>
    <Layout>
      <Component {...props} />
    </Layout>
  </ErrorBoundary>
);

const Router = ({ AUTHORIZED, USER_PROFILE }) => {
  return (
    <HashRouter>
      {console.log(AUTHORIZED)}
      <Switch>
        <Route
          exact
          component={withLayout(HomeLayout)(HomePage)}
          path={APP_PATHS.HOME}
        />

        <PrivateRoute
          exact
          condition={AUTHORIZED}
          component={withLayout(EditorNavLayout)(ProjectListPage)}
          path={APP_PATHS.EDITORS}
        />

        <PrivateRoute
          exact
          condition={AUTHORIZED}
          component={withLayout(noPaddingLayout)(EditorPage)}
          path={APP_PATHS.EDITOR}
        />
      </Switch>
    </HashRouter>
  );
};

const Routing = ({ dispatch, AUTHORIZED, TOKEN, USER_PROFILE, history, location }) => {
  const [readyToRender, setReadyToRender] = useState(false);
  console.log(TOKEN)
  const onTokenGqlCompleted = (data) => {
    if (data) {
      localStorage.setItem("lattex-token", data)
      dispatch(setToken(data));
      gqlGetProfile();
    } else {
      dispatch(logout());
      setReadyToRender(true);
    }
  };


  const onProfileGqlCompleted = (data) => {
    const { me } = data;
    console.log(data)
    if (me) {
      dispatch(login(me));
      history.push(window.location.pathname)
      setReadyToRender(true);
    } else {
      localStorage.removeItem("lattex-token");
      dispatch(logout());
      history.push(window.location.pathname)
    }
  };

  const [gqlGetProfile, { loading: gqlProfileLoading }] = useLazyQuery(GET_PROFILE_GQL, {
    onCompleted: onProfileGqlCompleted,
    onError: (error) => {
      onGqlError(error);
      localStorage.removeItem("lattex-token");
      dispatch(logout());
      setReadyToRender(true);
    },
  });

  const gqlGetToken = (code) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}authenticate?code=${code}`)
      .then(res => res.json())
      .then(
        (result) => {
          onTokenGqlCompleted(result?.access_token)
          history.push(window.location.pathname)
        },
        (error) => {
          localStorage.removeItem("lattex-token");
          dispatch(logout());
          history.push(window.location.pathname)
          setReadyToRender(true);
        }
      )
  }


  useEffect(() => {
    dispatch(loading(gqlProfileLoading, "root-loader"));
  }, [gqlProfileLoading]);

  useEffect(() => {
    if (TOKEN) {
      gqlGetProfile();
    } else {
      const code = queryString.parse(location.search).code
      if (code) {
        gqlGetToken(code);
      } else {
        dispatch(logout());
        setReadyToRender(true);
      }
    }
  }, []);

  return readyToRender ? <Router {...{ AUTHORIZED, USER_PROFILE }} /> : null;
};

const mapStateToProps = ({ AUTHORIZED, TOKEN, USER_PROFILE }) => ({
  AUTHORIZED,
  TOKEN,
  USER_PROFILE,
});

const PrivateRoute = ({
  component: Component,
  condition,
  redirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        condition ? (
          <Component {...props} />
        ) : (
            <Redirect to={redirect ? redirect : APP_PATHS.HOME} />
          )
      }
    />
  );
};

export default withRouter(connect(mapStateToProps)(Routing));
