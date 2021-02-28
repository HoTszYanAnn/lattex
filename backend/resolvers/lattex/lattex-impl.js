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
          ... on Repository {
            object(expression: "master:") {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Tree {
                      entries {
                        name
                        type
                        object {
                          ... on Blob {
                            byteSize
                            oid
                          }
                        }
                      }
                    }
                    ... on Blob {
                      byteSize
                      text
                      oid
                    }
                  }
                }
              }
            }
          }
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
      {
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

exports.uploadImage = (parent, { input }, context, info) => {
  const { base64, name: filename, repo_name, file_type } = input
  
  return {
    ...parent,
    base64,
    filename: `${filename}.${file_type}`,
    repo_name,
  }
}