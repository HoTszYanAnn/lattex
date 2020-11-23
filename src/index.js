import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./pages/";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./apollo";

import "./styles.scss";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F8B21C',
      opposite: '#ffffff'
    },
  },
  typography: {
    fontFamily: 'Inika',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Layout />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
