const _ = require('lodash')

exports.getDocuments = async (parent, input, { gitUser }, info) => ({
  ...parent,
  query: `
    query { 
      viewer { 
        repositories(first : 100){
          nodes{
            createdAt
            description
            url
            id
            isPrivate
            name
            pushedAt
          }
        }
      }
    }
  `
})

exports.getDocument = (parent, input, context, info) => ({
  ...parent,
  query: `
    query { 
      viewer { 
        repository(name : "${input ? input.name ? input.name : parent.name : parent.name}"){
          createdAt
          description
          url
          id
          isPrivate
          name
          pushedAt
        }
      }
    }
  `
})

exports.addDocument = (parent, { input }, context, info) => ({
  ...parent,
  query: `
    mutation{
      createRepository(
        input	:	{
          name: "${input.name}"
          visibility: ${input.visibility}
          description: "${input.description}(made by lattex)"  
        }
      ){
        repository{
          createdAt
          description
          url
          id
          isPrivate
          name
          pushedAt
        }
      }
    }
  `
})