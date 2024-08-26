import { Router } from "express";
import database from "../libs/db";
import { htmlPage } from "../libs/page";

import newAnime from "./POST/newAnime";
import addEpisode from "./POST/addEpisode";
import signUp from "./POST/signUp";
import login from "./POST/login";
import newProfile from "./POST/newProfile";
import newList from "./POST/newList";

import getAllAnimes from "./GET/getAllAnimes";
import getAnimeById from "./GET/getAnimeById";
import getEpisodes from "./GET/getEpisodes";
import getMostPopularAnime from "./GET/getMostPopularAnime";
import getSimilarAnimes from "./GET/getSimilarAnime";
import getAllProfiles from "./GET/getAllProfiles";
import getLists from "./GET/getList";

const route = Router();

// GET
//        FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE
route.get("/", (req, res) => {
  //  database.query(`CREATE TABLE Lists(
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       name TEXT NOT NULL,
  //       profile_id INTEGER NOT NULL,

  //      FOREIGN KEY(profile_id) REFERENCES User(id) ON DELETE CASCADE

  //   )`).run()
  //database.query(`ALTER TABLE Animes ADD views_ INTEGER`).run()
  //database.query(`DROP TABLE Episodes`).run()
  //database.query(`DELETE FROM Animes`).run()
  //database.query(`DELETE FROM User`).run()
  //database.query(`DELETE FROM Episodes`).run()
  //database.query(`DELETE FROM Genre`).run()
  //database.query(`DELETE FROM Genres`).run()
  //database.query(`DELETE FROM Profiles`).run()

  res.send(htmlPage);
});

// Animes Rotues
route.get("/anime/d/all", getAllAnimes);
route.get("/anime/:animeId", getAnimeById);
route.get("/anime/d/mostPopular", getMostPopularAnime);
route.get("/anime/:animeId/similar", getSimilarAnimes);

// Episodes Routes
route.get("/anime/:animeId/episode/all", getEpisodes);

// Profiles Routes
route.get("/user/:userId/profile/d/all", getAllProfiles);

// Lists Routes
route.get("/user/profile/:profileId/list/all", getLists);

// POST

// Animes Routes
route.post("/anime/new", newAnime);

// Episodes Routes
route.post("/anime/:animeId/episode/new", addEpisode);

// Users Routes
route.post("/user/new", signUp);
route.post("/user/login", login);

// profiles Routes
route.post("/user/:userId/profile/d/new", newProfile);

// Lists Routes
route.post("/user/profile/:profileId/list/new", newList);

export default route;
