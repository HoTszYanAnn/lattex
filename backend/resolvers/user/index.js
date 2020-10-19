const _ = require("lodash");
const { pipeResolvers, combineResolvers } = require("graphql-resolvers");
const { authenticated } = require("../utils");
const { getSelfInfo, getAuthToken } = require("./user-impl")

exports.Query = {
  me: getSelfInfo,
}

exports.Mutation = {
  me: getSelfInfo,
  authenticate: getAuthToken,
}