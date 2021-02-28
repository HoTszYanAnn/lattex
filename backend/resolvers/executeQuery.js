const utf8 = require('utf8');
const { Base64 } = require('js-base64');
const { id } = require('date-fns/locale');

exports.executeGitGraphql = async (parent, input, { gitUser }, info) => {
  const { query } = parent
  try {
    console.log(query)

    const rawData = (await gitUser.post('/graphql', {
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

exports.executeGitPutImage = async (parent, input, { gitUser, username }, info) => {
  const { base64, repo_name, filename } = parent

  try {
    const rawData = (await gitUser.put(`/repos/${username}/${repo_name}/contents/images/${filename}`, {
      message: `add image ${filename} `,
      content: base64.split(',')[1]
    })).data;

    return {
      url: `https://github.com/${username}/${repo_name}/blob/master/images/${filename}?raw=true`,
      name: filename
    }
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

exports.executeGitPutRepo = async (parent, input, { gitUser, username }, info) => {
  const { parseText, name, oid } = parent
  try {
    const rawData = (await gitUser.put(`/repos/${username}/${name}/contents/main.tex`, {
      sha: oid,
      message: `update ${new Date()}`,
      content: utf8.encode(Base64.encode(parseText))
    })).data;

    return parent;
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

exports.executeGitDeleteRepo = async (parent, { name }, { gitUser, username }, info) => {
  try {
    const rawData = (await gitUser.delete(`/repos/${username}/${name}`, {
    })).data;

    return true;
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

exports.executeCopyTemplateGraphql = async (parent, { path, input }, { gitUser, username }, info) => {
  try {
    const rawData = (await gitUser.get(`/repos/MHW2003/template/contents/${path}`, {
    })).data.content;

    const putResult = (await gitUser.put(`/repos/${username}/${input.name}/contents/main.tex`, {
      message: `clone ${path} ${new Date()}`,
      branch: 'master',
      content: rawData
    })).data;

    return parent
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}