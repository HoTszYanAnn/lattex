import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./pages/";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/";

import "./styles.scss";
import InikaWoff2 from './inika-latin-400-normal.woff2'

const store = configureStore();

const inika = {
  fontFamily: 'Inika',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `local('Inika'), url(${InikaWoff2}) format('woff2')`,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FCB941',
    }
  },
  typography: {
    fontFamily: 'Inika',
  },
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
