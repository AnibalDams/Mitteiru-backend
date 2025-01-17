import { Anime } from "../../classes/animes";
import type { Response, Request } from "express";



export default async function getByAnimeById(req: Request, res: Response){
    try{
        const animeId =req.params.animeId
        const anime = new Anime(animeId)
        const getByAnimeById =await anime.getById()
        switch (getByAnimeById.message) {
            case "anime found":
                res.statusCode = 200
                res.json(getByAnimeById)
                break;
            case "An error has occurred while getting the animes":
                res.statusCode = 500
                res.json(getByAnimeById)
                break
        
            default:
                break;
        }

    }catch(error:any){
        res.statusCode = 500
        res.json({message:"There was an error",error:error.message})
    }
}