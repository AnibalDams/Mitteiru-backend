import { Router } from "express";
import { htmlPage } from "../libs/page";

import newAnime from "./POST/newAnime";
import addEpisode from "./POST/addEpisode";
import signUp from "./POST/signUp";
import login from "./POST/login";
import newProfile from "./POST/newProfile";
import newList from "./POST/newList";
import addAnimeToList from "./POST/addToListAnime";
import addToHistory from "./POST/addToHistory";
import addLikeToAnime from "./POST/addLike";

import getAllAnimes from "./GET/getAllAnimes";
import getAnimeById from "./GET/getAnimeById";
import getEpisodes from "./GET/getEpisodes";
import getMostPopularAnime from "./GET/getMostPopularAnime";
import getSimilarAnimes from "./GET/getSimilarAnime";
import getAllProfiles from "./GET/getAllProfiles";
import getLists from "./GET/getList";
import getAnimesInList from "./GET/getAnimesInList";
import getAnimesOfAGenre from "./GET/getAnimesOfAGenre";
import getAllGenres from "./GET/getAllGenres";
import getAnimesOfAnStudio from "./GET/getAnimesOfAnStudio";
import getAnimeOfAyear from "./GET/getAnimesOfAYear";
import getHistory from "./GET/getHistory";
import getLikes from "./GET/getrLikes";
import getAnimesWithMostLikes from "./GET/getAnimesWithMostLikes";

import removeAnimeFromList from "./DELETE/removeFromList";
import deleteProfile from "./DELETE/deleteProfile"

import updateProfile from "./PUT/updateProfile";
import decodeToken from "./GET/decodeToken";
import addReview from "./POST/addReview";
import getReviews from "./GET/getAllReviews";
import getReviewById from "./GET/getReviewById";

const route = Router();

// GET
//        FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE
route.get("/", (req, res) => {
      // database.query(`CREATE TABLE animes_likes(
      //       id INTEGER PRIMARY KEY AUTOINCREMENT,
      //       anime_id INTEGER NOT NULL,
      //       likes INTEGER NOT NULL,
          

      //      FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE

      //   )`).run()
  //database.query(`ALTER TABLE History ADD profile_id INTEGER`).run()
  //database.query(`DROP TABLE Episodes`).run()
  //database.query(`DELETE FROM Animes`).run()
  //database.query(`DELETE FROM User`).run()
  //database.query(`DELETE FROM Episodes`).run()
  //database.query(`DELETE FROM Genre`).run()
  //database.query(`DELETE FROM Genres`).run()
  //database.query(`DELETE FROM Profiles`).run()
  //database.query(`DELETE FROM History`).run()

  res.send(htmlPage);
});



route.get("/user/decode", decodeToken)

// Animes Rotues
route.get("/anime/:animeId", getAnimeById);
route.get("/anime/d/all", getAllAnimes);
route.get("/anime/d/mostPopular", getMostPopularAnime);
route.get("/anime/d/studio/:studio",getAnimesOfAnStudio)
route.get("/anime/d/year/:year",getAnimeOfAyear)
route.get("/anime/d/mostLiked",getAnimesWithMostLikes)
route.get("/anime/:animeId/similar", getSimilarAnimes);
route.get("/anime/:animeId/likes/count",getLikes)
route.get("/anime/genre/:genre", getAnimesOfAGenre)
route.get("/anime/genre/d/all", getAllGenres)
route.get("/anime/:animeId/review/all", getReviews)
route.get("/anime/:animeId/review/:reviewId", getReviewById)


// Episodes Routes
route.get("/anime/:animeId/episode/all", getEpisodes);

// Profiles Routes
route.get("/user/:userId/profile/d/all", getAllProfiles);
route.get("/user/profile/:profileId/history", getHistory);



// Lists Routes
route.get("/user/profile/:profileId/list/all", getLists);
route.get("/user/profile/:profileId/list/anime/all", getAnimesInList);

// POST

// Animes Routes
route.post("/anime/new", newAnime);
route.post("/anime/:animeId/like/:profileId", addLikeToAnime);
route.post("/anime/:animeId/review/new", addReview)

// Episodes Routes
route.post("/anime/:animeId/episode/new", addEpisode);

// Users Routes
route.post("/user/new", signUp);
route.post("/user/login", login);

// profiles Routes
route.post("/user/:userId/profile/d/new", newProfile);
route.post("/user/profile/:profileId/history/:animeId/:episodeNumber/add", addToHistory);

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
