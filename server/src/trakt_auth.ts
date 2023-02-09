import axios from "axios";
require("dotenv").config();

// Function to get access token from trakt, using the code from the redirect
function getAccessToken(code) {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://api.trakt.tv/oauth/token`, {
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.TRAKT_REDIRECT_URI,
        grant_type: "authorization_code",
      })
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export { getAccessToken };
