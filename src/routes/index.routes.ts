import {Router} from 'express'
import database from '../libs/db';

import newAnime from './POST/newAnime';
const route = Router()




// GET

route.get('/',(req,res)=>{
    // database.query(`CREATE TABLE Genres(
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name VARCHAR(255) NOT NULL,
    //     anime_id INTEGER NOT NULL,

    //     FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE

    // )`).run()
    // database.query(`DELETE FROM Animes`).run()
    // database.query(`DELETE FROM Genre`).run()
    // database.query(`DELETE FROM Genres`).run()
   
   
    res.send(`<h1 style="display:inline-block;font-family:calibri;margin-right:30pc;margin-top:50px;color:white;paddin:10px;background-color:blue;border-radius:10px;">Hello World</h1>`)
})



// POST

// Animes Routes
route.post("/anime/new", newAnime)

export default route