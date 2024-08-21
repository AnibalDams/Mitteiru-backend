import {Router} from 'express'
import database from '../libs/db';
import { htmlPage } from '../libs/page';

import newAnime from './POST/newAnime';
import addEpisode from './POST/addEpisode';


import getAllAnimes from './GET/getAllAnimes';
import getAnimeById from './GET/getAnimeById';
import getEpisodes from './GET/getEpisodes';


const route = Router()




// GET

route.get('/',(req,res)=>{
    //    database.query(`CREATE TABLE Episodes(
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        name VARCHAR(255) NOT NULL,
    //        episode_number INTEGER NOT NULL,
    //        synopsis TEXT NOT NULL,
    //        thumbnail TEXT NOT NULL,
    //        link TEXT NOT NULL,
    //        anime_id INTEGER NOT NULL,

    //        FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE

    //    )`).run()
    //database.query(`ALTER TABLE Animes ADD views_ INTEGER`).run()
    //database.query(`DROP TABLE Episodes`).run()
     //database.query(`DELETE FROM Animes`).run()
     //database.query(`DELETE FROM Episodes`).run()
     //database.query(`DELETE FROM Genre`).run()
     //database.query(`DELETE FROM Genres`).run()
   
   
    res.send(htmlPage)
})


// Animes Rotues
route.get('/anime/all',getAllAnimes)
route.get('/anime/:animeId',getAnimeById)


// Episodes Routes
route.get('/anime/:animeId/episode/all',getEpisodes)

// POST

// Animes Routes
route.post("/anime/new", newAnime)


// Episodes Routes
route.post("/anime/:animeId/episode/new", addEpisode)

export default route