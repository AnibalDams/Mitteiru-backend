import {Router} from 'express'
import database from '../libs/db';
import { htmlPage } from '../libs/page';

import newAnime from './POST/newAnime';
import addEpisode from './POST/addEpisode';
import signUp from './POST/signUp';
import login from './POST/login';

import getAllAnimes from './GET/getAllAnimes';
import getAnimeById from './GET/getAnimeById';
import getEpisodes from './GET/getEpisodes';
import getMostPopularAnime from './GET/getMostPopularAnime';

const route = Router()




// GET
    //        FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE
route.get('/',(req,res)=>{
    //    database.query(`CREATE TABLE User(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         username VARCHAR(255) NOT NULL,
    //         email VARCHAR(255) NOT NULL,
    //         password TEXT NOT NULL
         


    //     )`).run()
    //database.query(`ALTER TABLE Animes ADD views_ INTEGER`).run()
    //database.query(`DROP TABLE Episodes`).run()
     //database.query(`DELETE FROM Animes`).run()
     //database.query(`DELETE FROM User`).run()
     //database.query(`DELETE FROM Episodes`).run()
     //database.query(`DELETE FROM Genre`).run()
     //database.query(`DELETE FROM Genres`).run()
   
   
    res.send(htmlPage)
})


// Animes Rotues
route.get('/anime/d/all',getAllAnimes)
route.get('/anime/:animeId',getAnimeById)
route.get('/anime/d/mostPopular',getMostPopularAnime)


// Episodes Routes
route.get('/anime/:animeId/episode/all',getEpisodes)

// POST

// Animes Routes
route.post("/anime/new", newAnime)


// Episodes Routes
route.post("/anime/:animeId/episode/new", addEpisode)


// Users Routes
route.post("/user/new",signUp)
route.post("/user/login",login)

export default route