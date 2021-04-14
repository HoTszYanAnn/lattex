const { executeGitGraphql } = require('./resolvers/executeQuery')
const { getAuthToken } = require('./api/authenticate')
var cors = require('cors')
const express = require("express");
const { json } = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const axios = require("axios");

const typeDefs = importSchema("./schemas/index.graphql");
const resolvers = require("./resolvers").getResolvers();

const corsOptions = {
  origin: 'https://hotszyanann.github.io',
  credentials: true
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: cors(corsOptions),
  context: async ({ req, res }) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', 'https://hotszyanann.github.io');
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ''

      const gitUser = axios.create({
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
        baseURL: 'https://api.github.com'
      });

      const res = await executeGitGraphql({
        query: `
          query{
            viewer{
              login
            }
          }
        `
      }, undefined, { gitUser })
      const username = res.rawData.viewer.login

      return Object.assign(
        {},
        {
          req,
          token,
          gitUser,
          username
        },
        {
        }
      );
    } catch (e) {
      console.log(e)
      throw new Error('not authenticate')
    }
  },
  playground: true,
});

// Initialize the app
const app = express();
app.use(json({ limit: '2mb' }))
app.use(cors(corsOptions));
server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });
app.use('/authenticate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://hotszyanann.github.io');
  getAuthToken(req, res)
})

app.listen({ port: process.env.PORT || 3001 }, () => {
  console.log("Apollo Server on http://localhost:3001/graphql");
});
