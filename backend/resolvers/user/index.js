const _ = require("lodash");
const { pipeResolvers, combineResolvers } = require("graphql-resolvers");
const { getSelfInfo } = require("./user-impl");
const { executeGitGraphql } = require("../executeQuery");

exports.Query = {
  me: pipeResolvers(
    getSelfInfo,
    executeGitGraphql,
    ({ rawData }) => ({
      avatarUrl: rawData.viewer.avatarUrl,
      name: rawData.viewer.login,
    })
  ),
}
