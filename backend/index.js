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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
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


server.applyMiddleware({ app, cors: {
  origin: "*",
  methods: ["get", "post"],
  credentials: true,
  maxAge: 3600,
}});

app.use('/authenticate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://hotszyanann.github.io');
  getAuthToken(req, res)
})

app.listen({ port: process.env.PORT || 3001 }, () => {
  console.log("Apollo Server on");
});
