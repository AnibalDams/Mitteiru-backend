import AnimeInList from "../../classes/animesInList";
import type {Response, Request} from 'express'

export default async function addAnimeToList(req:Request, res:Response){
    try {
        const animeId = req.params.animeId
        const listId = req.params.listId
        const addAnimeToList =await new AnimeInList("",animeId,listId,"").addToList()
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