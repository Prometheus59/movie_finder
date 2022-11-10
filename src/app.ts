import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

// console.log(process.env.CLIENT_ID);

/**
 * Function to get trending movies and save response to a file
 */
function getTrendingMovies() {
  axios({
    method: "get",
    url: "https://api.trakt.tv/movies/trending",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
    },
  }).then((response) => {
    console.log(response.data);
    fs.writeFile("trendingMovies.txt", JSON.stringify(response.data), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    return response.data;
  });
}

/**
 * Function to authenticate a user
 *
 */
function authenticateUser() {
  let interval = 5000;
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
      return response.data;
    })
    .then((res) => {
      // Every 5 seconds, poll the traktTv api to check if the user has authorized the device
      let timeout = Number(new Date()) + (res.expires_in || 600000);

      console.log(
        `Polling traktTv api... \nInterval: ${interval} \n device_code: ${res.device_code}`
      );

      let intervalId = setInterval(() => {
        if (Number(new Date()) > timeout) clearInterval(intervalId);
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
              fs.writeFile(
                "token.txt",
                JSON.stringify(response.data),
                (err) => {
                  if (err) throw err;
                  console.log("The file has been saved as token.txt");
                }
              );
              clearInterval(intervalId);
            }
          })
          .catch((err) => {
            console.log(err.code);
            console.log(err.response.status + " " + err.response.statusText);
          });
      }, interval);
    })
    .catch((err) => {
      console.log(err);
    });
}

//TODO: Test that above function stops calling after successful response

/**
 * Just get Access Token
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

/**
 * Function to get a user's settings (e.g. id slug)
 */

function getUserSlug(accessToken) {
  axios({
    method: "get",
    url: "https://api.trakt.tv/users/settings",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data.user.ids.slug;
    })
    .catch((err) => {
      console.log(err.response.status + " " + err.response.statusText);
      console.log(err.response.data);
    });
}

// let userSlug = getUserSlug(
//   "4bb162d4c9445b2a726fde28af1f4094c55e18cb99ee30cd4615be90b29d84d1"
// );

/**
 * Function to get a user's watch history and save response to json file
 * @param {string} slug - user's slug
 * @param {string} type - type of history to get (movies or shows)
 */
function getWatchHistory(slug, type) {
  axios({
    method: "get",
    url: `https://api.trakt.tv/users/${slug}/watched/${type}`,
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
    },
  })
    .then((response) => {
      console.log(response);
      fs.writeFile(
        "watchHistory.json",
        JSON.stringify(response.data),
        (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        }
      );
    })
    .catch((err) => {
      console.log(err.response.status + " " + err.response.statusText);
      console.log(err.response.data);
    });
}

// getWatchHistory("prometheus59", "movies");

/**
 * Function to get a movie's details
 * @param {string} id - movies id
 */

function getMovieSummary(id) {
  axios({
    method: "get",
    url: `https://api.trakt.tv/movies/${id}`,
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.status + " " + err.response.statusText);
      console.log(err.response.data);
    });
}

// getMovieSummary("8604112762");
