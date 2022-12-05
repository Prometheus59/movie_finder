const express = require("express");
const router = express.Router();
import { getShows } from "../trakt";
import { getShowInfo } from "../tmdb";

// Default show route gets trending shows
router.get("/", (req, res) => {
  getShows("trending").then((shows) => {
    res.json(shows);
  });
});

// Route to get shows with a parameter for category
router.get("/:category", (req, res) => {
  const category = req.params.category;
  getShows(category).then((shows) => {
    res.json(shows);
  });
});

// Route to get information about a specific show
router.get("/info/:tmdb_id", (req, res) => {
  const tmdb_id = req.params.tmdb_id;
  getShowInfo(tmdb_id).then((show) => {
    res.json(show);
  });
});

module.exports = router;
