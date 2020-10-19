const { git } = require("../../config");

exports.getSelfInfo = async (parent, input, { gitUser }) => {
  const query = `
    query{
      viewer{
        avatarUrl
        login
      }
    }
  `
  try {
    const rawData = (await gitUser.post('', {
      query
    })).data.data.viewer;
    console.log(rawData)
    return {
      avatarUrl: rawData.avatarUrl,
      name: rawData.login,
    }
  } catch (e) {
    throw new Error(e)
  }
};

exports.getAuthToken = async (parent, { code }, context) => {
  const axios = require("axios");
  const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const GITHUB_URL =
    `${ACCESS_TOKEN_URL}?client_id=${git.client_id}&client_secret=${git.client_secret}&code=${code}`;

  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  const axiosPost = axios.post(
    GITHUB_URL,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/json'
      }
    });

  try {
    const rawData = (await axiosPost).data
    return new URLSearchParams(rawData).get("access_token")
  } catch (e) {
    throw new Error(e)
  }
}