const { git } = require("../config");

exports.getAuthToken = async (req, res) => {
  const axios = require("axios");
  const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const GITHUB_URL =
    `${ACCESS_TOKEN_URL}?client_id=${git.client_id}&client_secret=${git.client_secret}&code=${req.query.code}`;

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
    res.send({ access_token: new URLSearchParams(rawData).get("access_token") })
  } catch (e) {
    res.send({ error: e.message })
  }
}