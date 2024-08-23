import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";


export default class Genre {
    id:number
    name:string
    animeId:number

    constructor(id:number=0, name:string="", animeId:number=0){
        this.id = id;
        this.name = name;
        this.animeId = animeId;
    }

    getAnimes():ReturnData{
        try {
            const animes = database.query(`SELECT Animes.id, Animes.name, Animes.japanese_name, Animes.release_year,Animes.studio,Animes.horizontal_image FROM Genres INNER JOIN Animes ON Animes.id = Genres.anime_id WHERE Genres.name = $name`).all({$name:this.name})
            return {message:"Success",animes:animes}
        
        } catch (error:any) {
            return {message:"An error occurred", error:error.message}
        }
    }
}