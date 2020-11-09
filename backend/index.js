require("dotenv").config();
const { executeGitGraphql } = require('./resolvers/executeGitGraphql')
const { getAuthToken } = require('./api/authenticate')
var cors = require('cors')
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
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : ''

    const gitUser = axios.create({
      headers: {
        common: {
          Authorization: `Bearer ${token}`,
        },
      },
      baseURL: 'https://api.github.com/graphql'
    });

    try {
      const res = await executeGitGraphql({
        query: `
          query{
            viewer{
              avatarUrl
            }
          }
        `
      }, undefined, { gitUser })
    } catch (e) {
      console.log(e)
      throw new Error('not authenticate')
    }

    return Object.assign(
      {},
      {
        req,
        token,
        gitUser
      },
      {
      }
    );
  },
  playground: true,
});

// Initialize the app
const app = express();

server.applyMiddleware({ app, path: "/graphql" });
app.use(cors())
app.use('/authenticate', getAuthToken)

app.listen({ port: 3001 }, () => {
  console.log("Apollo Server on http://localhost:3001/graphql");
});
