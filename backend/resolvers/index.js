const _ = require("lodash");

const importedResolvers = [
  require("graphql-scalars").resolvers,
  require("./user"),
  require("./lattex"),
];

exports.getResolvers = () => _.merge({}, ...importedResolvers);