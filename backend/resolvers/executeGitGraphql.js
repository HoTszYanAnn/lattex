exports.executeGitGraphql = async (parent, input, { gitUser }, info) => {
  const { query } = parent
  try {
    console.log(query)
    
    const rawData = (await gitUser.post('', {
      query
    })).data.data;

    console.log(rawData)
    return {
      ...parent,
      rawData
    }
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}