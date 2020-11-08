exports.getSelfInfo = (parent) => ({
  ...parent,
  query: `
    query{
      viewer{
        avatarUrl
        login
      }
    }
  `
});
