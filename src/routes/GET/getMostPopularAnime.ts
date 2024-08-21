import { Anime } from "../../classes/animes";
import type { Response,Request } from "express";


export default function getMostPopularAnimes(req:Request, res:Response):void{
    try {
        const animes = new Anime()
        const mostPopular = animes.getMostPopular()
        switch(mostPopular.message){
            case "success":
                res.statusCode = 200
                res.json(mostPopular)
                break
            case "An error has occurred while getting the animes":
                res.statusCode = 500
                res.json(mostPopular)
                break
        }

    } catch (error:any) {
        res.statusCode = error.message        
        res.json({message:"There was an error", error:error.message})
    }
}