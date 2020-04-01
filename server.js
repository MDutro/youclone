require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const KEY = process.env.KEY;
const cors = require("cors");
const unescape = require("lodash.unescape");

app.use(cors());

app.get("/search", (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&key=${KEY}&q=${req.query.q}`;
  axios
    .get(url)
    .then(response => response.data)
    .then(data =>
      data.items.map(item => {
        item.snippet.title = unescape(item.snippet.title);
        return item;
      })
    )
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.listen(3001, console.log("server listening on port 3001"));
