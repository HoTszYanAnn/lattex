import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { APP_PATHS } from "./config";
import { loading, login, logout } from "./store/actions/";

import HomePage from './pages/home'
import LoginPage from './pages/login'
import EditorPage from './pages/editor'

import { MainLayout, noPaddingLayout } from "./layout"
import ErrorBoundary from "./components/error-boundary";


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
      <Switch>
        <Route
          exact
          component={withLayout(MainLayout)(HomePage)}
          path={APP_PATHS.HOME}
        />
        <Route
          exact
          component={withLayout(MainLayout)(LoginPage)}
          path={APP_PATHS.LOGIN}
        />
        <Route
          exact
          component={withLayout(noPaddingLayout)(EditorPage)}
          path={APP_PATHS.EDITOR}
        />
      </Switch>
    </BrowserRouter>
  );
};

const Routing = ({ dispatch, AUTHORIZED, TOKEN, USER_PROFILE }) => {
  
  return <Router {...{ AUTHORIZED, USER_PROFILE }} />
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
