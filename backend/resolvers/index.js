const _ = require("lodash");

const importedResolvers = [
  require("graphql-scalars").resolvers,
  require("./user"),
];

exports.getResolvers = () => _.merge({}, ...importedResolvers);