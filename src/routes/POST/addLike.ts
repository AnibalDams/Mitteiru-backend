import { Anime } from "../../classes/animes";
import type {Response, Request} from 'express'

export default async function addLikeToAnime(req:Request, res:Response){
    try {
        const animeId = req.params.animeId
        const profileId = req.params.profileId
        const addLike =await new Anime(animeId).addLike(profileId)
        switch(addLike.message){
            case "success 1":
                res.statusCode = 200
                res.json(addLike)
                break
            case "success 2":
                res.statusCode = 201
                res.json(addLike)
                break
            case "An error has occurred while adding the like":
                res.statusCode = 500
                res.json(addLike)
                break
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    }
}