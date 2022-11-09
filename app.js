import axios from "axios";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// console.log(process.env.CLIENT_ID);

/**
 * Function to get trending movies and save response to a file
 */
// axios({
//   method: "get",
//   url: "https://api.trakt.tv/movies/trending",
//   headers: {
//     "Content-Type": "application/json",
//     "trakt-api-version": "2",
//     "trakt-api-key": process.env.CLIENT_ID,
//   },
// }).then((response) => {
//   console.log(response.data);
//   fs.writeFile("apiResponse.txt", JSON.stringify(response.data), (err) => {
//     if (err) throw err;
//     console.log("The file has been saved!");
//   });
// });

/**
 * Function to get device_code and user_code from traktTv api and save response to a file
 */
let interval = 4999;
axios({
  method: "post",
  url: "https://api.trakt.tv/oauth/device/code",
  headers: {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": process.env.CLIENT_ID,
  },
  data: {
    client_id: process.env.CLIENT_ID,
  },
})
  .then((response) => {
    console.log(response.data);
    // set interval
    interval = response.data.interval * 1000;
    fs.writeFile("apiResponse.txt", JSON.stringify(response.data), (err) => {
      if (err) throw err;
      console.log("The file has been saved as apiResponse.txt!");
    });
    return response;
  })
  .then((res) => {
    // Every 5 seconds, poll the traktTv api to check if the user has authorized the device
    let successful = false;
    let timeout = Number(new Date()) + (res.expires_in || 600000);

    console.log("Polling traktTv api: Interval = " + interval);

    setInterval(() => {
      axios({
        method: "post",
        url: "https://api.trakt.tv/oauth/device/token",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          code: res.device_code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            successful = true;
            fs.writeFile("token.txt", JSON.stringify(response.data), (err) => {
              if (err) throw err;
              console.log("The file has been saved as token.txt");
            });
          }
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.response.status + " " + err.response.statusText);
        });
    }, interval);
    if (Number(new Date()) > timeout || successful) clearInterval();
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * Get Access Token
 */

// axios({
//   method: "post",
//   url: "https://api.trakt.tv/oauth/device/token",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: {
//     code: "f938ca86d74fda4ba39739e0d26dc4f0418acaccaa47601e0558fd5cf8ee0d53",
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//   },
// })
//   .then((response) => {
//     console.log(response);
//     fs.writeFile("token.txt", JSON.stringify(response.data), (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios({
//   method: "get",
//   url: "https://api.trakt.tv/users/settings",
//   headers: {
//     "Content-Type": "application/json",
//     "trakt-api-version": "2",
//     "trakt-api-key": process.env.CLIENT_ID,
//     "Authorization": `9cca57b634e876a377738b53836970f3fd23165a93d5e40955fde52c2bf1bede`,
//   },
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log(err.response.data);
//   });
