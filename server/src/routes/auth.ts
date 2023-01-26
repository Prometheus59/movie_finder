import axios from "axios";
const express = require("express");
const router = express.Router();
require("dotenv").config();

// Redirect to request Trakt access
router.get("/redirect", (req, res) => {
  res
    .status(301)
    .redirect(
      "https://trakt.tv/oauth/authorize?response_type=code&client_id=5601a5a43f859e460af6a2f80179f9bc15443b5f525f4b1fe81469a1d6c29aa0&redirect_uri=http://localhost:3000/auth"
    );
});

router.post("/code", (req, res) => {
  axios
    .post(`https://api.trakt.tv/oauth/token`, {
      code: req.body.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.TRAKT_REDIRECT_URI,
      grant_type: "authorization_code",
    })
    .then((response) => {
      //TODO: Save the access token to the database
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

module.exports = router;
