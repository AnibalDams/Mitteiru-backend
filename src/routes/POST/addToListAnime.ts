import AnimeInList from "../../classes/animesInList";
import type {Response, Request} from 'express'

export default function addAnimeToList(req:Request, res:Response){
    try {
        const animeId = Number(req.params.animeId)
        const listId = Number(req.params.listId)
        const addAnimeToList = new AnimeInList(0,animeId,listId,0).addToList()
        switch(addAnimeToList.message){
            case "success":
                res.statusCode = 201
                res.json(addAnimeToList)
                break
            case "An error occurred":
                res.statusCode = 500
                res.json(addAnimeToList)
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    }
}