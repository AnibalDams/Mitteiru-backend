import Genre from "../../classes/genres";
import type {Response, Request} from 'express'

export default function getAnimesOfAGenre(req:Request, res:Response){
    try {
        const genre = req.params.genre
        const animes = new Genre(0,genre).getAnimes()
        switch(animes.message){
            case "Success":
                res.statusCode = 200
                res.json(animes)
                break
            case "An error occurred":
                res.statusCode = 500
                res.json(animes)
                break
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"there was an error",error:error.message})
    }
}