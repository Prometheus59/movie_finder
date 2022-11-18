"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
// import database connection
var con = require("./mysql");
require("dotenv").config();
// console.log(process.env);
// dotenv.config({ path: "../.env" });
// console.log(`password for tmdb is ${process.env.MYSQL_PASSWORD}`);
var tmdb_url = "https://api.themoviedb.org/3/";
function getMovieDetails(tmdb_id) {
    return new Promise(function (resolve, reject) {
        (0, axios_1.default)({
            method: "get",
            url: "".concat(tmdb_url, "movie/").concat(tmdb_id, "?api_key=").concat(process.env.TMDB_API_KEY),
        })
            .then(function (res) {
            console.log(res.data);
            resolve(res.data);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
getMovieDetails(928344);
// con.end();
