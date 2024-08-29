import { Router } from "express";
import database from "../libs/db";
import { htmlPage } from "../libs/page";

import newAnime from "./POST/newAnime";
import addEpisode from "./POST/addEpisode";
import signUp from "./POST/signUp";
import login from "./POST/login";
import newProfile from "./POST/newProfile";
import newList from "./POST/newList";
import addAnimeToList from "./POST/addToListAnime";

import getAllAnimes from "./GET/getAllAnimes";
import getAnimeById from "./GET/getAnimeById";
import getEpisodes from "./GET/getEpisodes";
import getMostPopularAnime from "./GET/getMostPopularAnime";
import getSimilarAnimes from "./GET/getSimilarAnime";
import getAllProfiles from "./GET/getAllProfiles";
import getLists from "./GET/getList";
import getAnimesInList from "./GET/getAnimesInList";

import removeAnimeFromList from "./DELETE/removeFromList";
import deleteProfile from "./DELETE/deleteProfile"

import updateProfile from "./PUT/updateProfile";

const route = Router();

// GET
//        FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE
route.get("/", (req, res) => {
  //  database.query(`CREATE TABLE Anime_lists(
  //        id INTEGER PRIMARY KEY AUTOINCREMENT,
  //        anime_id INTEGER NOT NULL,
  //        list_id INTEGER NOT NULL,

  //       FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE
  //       FOREIGN KEY(list_id) REFERENCES Lists(id) ON DELETE CASCADE

  //    )`).run()
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
route.get("/user/profile/:profileId/list/anime/all", getAnimesInList);

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
route.post("/anime/:animeId/list/:listId/add", addAnimeToList);

// DELETE

// Profiles Routes
route.delete("/user/profile/:profileId/delete", deleteProfile);

// Lists Routes
route.delete("/user/profile/list/:listId/anime/:animeId", removeAnimeFromList);


// PUT routes

// Profiles Routes
route.put("/user/profile/:profileId",updateProfile)



export default route;
