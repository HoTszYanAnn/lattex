const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { client_id, redirect_uri, client_secret, code } = req.body;

  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    header: {
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      redirect_uri: redirect_uri,
    }),
  })
    .then(response => response.text())
    .then(paramsString => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      const scope = params.get("scope");
      const token_type = params.get("token_type");
      console.log(access_token);
      return fetch(
        `https://api.github.com/user`, {
          method: "GET",
          header: {
            Authorization: access_token,
            Accept:'application/vnd.github.v3+json',
          },
        });
    })
    .then(response => response.json())
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
