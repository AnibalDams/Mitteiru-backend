import {Router} from 'express'
import {Anime} from '../classes/animes'


import database from '../libs/db'

const route = Router()


interface Anime_ {
    name:string;
    japaneseName:string;
    synopsis:string;
    releaseYear:string;
    studio:string
    cover:string;
    image:string;
    onGoing:number;
    horizontalImage:string;
    genres:string[];
    new:Promise<{ message: string; } | undefined>

}


route.get('/',(req,res)=>{
    // database.query(`CREATE TABLE Genres(
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name VARCHAR(255) NOT NULL,
    //     anime_id INTEGER NOT NULL,

    //     FOREIGN KEY(anime_id) REFERENCES Animes(id) ON DELETE CASCADE

    // )`).run()
    const anime = new Anime(0,"","","","","","","",0,"",["comedy","actions"])

    anime.new()
   
    res.send("hola")
})


export default route