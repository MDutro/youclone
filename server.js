require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const API_KEY = process.env.KEY;
const unescape = require("lodash.unescape");

app.use(cors());

/*       
By default, the YouTube search API does not correctly format all HTML entities.
Instead, the HTML number shows up for things like apostrophes and internal quotation marks.
The easiest way to deal with this problem is to use the unescape function of the lodash library.
This axios request takes the response.data object and uses map to run unescape over the title of every YouTube video
in the search results before passing the data object to the React front end.
*/

// 
app.get("/search", (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=${API_KEY}&q=${req.query.q}`;
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
