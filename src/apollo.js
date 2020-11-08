import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

// https://www.apollographql.com/docs/react/networking/authentication/

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL + 'graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("lattex-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
