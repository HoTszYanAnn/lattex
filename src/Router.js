import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { APP_PATHS } from "./config";

import HomePage from './pages/home'
import ProjectListPage from './pages/project-list'

import EditorPage from './pages/editor'

import { MainLayout, noPaddingLayout } from "./layout"
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
    <BrowserRouter>
    {console.log(AUTHORIZED)}
      <Switch>
        <Route
          exact
          component={ AUTHORIZED ? withLayout(MainLayout)(ProjectListPage) : withLayout(MainLayout)(HomePage)}
          path={APP_PATHS.HOME}
        />

        <PrivateRoute 
          exact
          condition={AUTHORIZED}
          component={withLayout(MainLayout)(ProjectListPage)}
          path={APP_PATHS.PROJECT_LIST}
        />
        <PrivateRoute 
          exact
          condition={AUTHORIZED}
          component={withLayout(noPaddingLayout)(EditorPage)}
          path={APP_PATHS.EDITOR}
        />
      </Switch>
    </BrowserRouter>
  );
};

const Routing = ({ dispatch, AUTHORIZED, TOKEN, USER_PROFILE, history, location }) => {
  const [readyToRender, setReadyToRender] = useState(false);
  
  const onTokenGqlCompleted = (data) => {
    const { authenticate } = data;
    console.log(authenticate)
    if (authenticate) {
      localStorage.setItem("lattex-token", authenticate)
      dispatch(setToken(authenticate));
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
      setReadyToRender(true);
    } else {
      localStorage.removeItem("lattex-token");
      dispatch(logout());
    }
  };

  const [gqlGetProfile, { loading: gqlProfileLoading }] = useLazyQuery(GET_PROFILE_GQL, {
    onCompleted: onProfileGqlCompleted,
    onError: (error) => {
      onGqlError(error);
	    setReadyToRender(true);
    },
  });

  const [gqlGetToken, { loading: gqlTokenLoading }] = useMutation(GET_TOKEN_GQL, {
    onCompleted: onTokenGqlCompleted,
    onError: (error) => {
      onGqlError(error);
    },
  });

  useEffect(() => {
    dispatch(loading(gqlTokenLoading || gqlTokenLoading, "root-loader"));
  }, [gqlTokenLoading]);
  
  useEffect(() => {
    dispatch(loading(gqlProfileLoading || gqlTokenLoading, "root-loader"));
  }, [gqlProfileLoading]);

  useEffect(() => {
    if (TOKEN) {
      gqlGetProfile();
    } else {
      const code = queryString.parse(location.search).code
      if (code) {
        gqlGetToken({
          variables: {
            code
         }
        });
      }else{
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
