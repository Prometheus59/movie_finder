import axios from "axios";
import { getAccessToken } from "../trakt_auth";
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

// NOTE: This route requires function that will not be implemented anymore
// router.post("/code", (req, res) => {
//   const code = req.body.code;
//   getAccessToken(code)
//     .then((access_token) => {
//       getUserInfo(access_token)
//         .then((user) => {
//           console.log(JSON.stringify(user));
//           // Returns: {"username":"Prometheus59","private":false,"name":"Prometheus59","vip":false,"vip_ep":false,"ids":{"slug":"prometheus59"}}
//           // TODO: Check database to see if user exists, if not, create new user in database -->
//           // note: Might need to prompt for password (and username) to create a new user
//           res.status(200).json(user);
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json(err);
//           throw err;
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//       throw err;
//     });
// });

module.exports = router;
