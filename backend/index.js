require("dotenv").config();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const axios = require("axios");

const typeDefs = importSchema("./schemas/index.graphql");
const resolvers = require("./resolvers").getResolvers();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ''

      let user
      let authenticated

      const gitUser = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
        baseURL: 'https://api.github.com/graphql'
      });

      console.log(authenticated)

      return Object.assign(
        {},
        {
          req,
          token,
          user,
          authenticated,
          gitUser
        },
        {
        }
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  playground: true,
});

// Initialize the app
const app = express();

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 3001 }, () => {
  console.log("Apollo Server on http://localhost:3001/graphql");
});
