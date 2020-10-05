import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./pages/";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/";

import "./styles.scss";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FCB941',
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
