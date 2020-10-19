
const code = require("http-status-codes");

exports.authenticated = (errorCode) => (parent, args, { authenticated }) => {
  if (!authenticated)
    if (errorCode) throw Error(code.getStatusText(errorCode));
    else throw Error('Not Authenticated');
  else return undefined;
};

