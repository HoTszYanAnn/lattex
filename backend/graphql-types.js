const { importSchema } = require("graphql-import");
exports.typeDefs = importSchema("./schemas/index.graphql");
