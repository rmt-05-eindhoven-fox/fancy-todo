"use strict";
const axios = require("axios");
require("dotenv").config();

class MangaController {
  static showManga(req, res, next) {
    axios({
      url: `https://api.jikan.moe/v3/top/manga/1/favorite`,
    })
      .then((data) => {
        const list = data.data.top;
        res.status(200).json({ list });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = MangaController;
