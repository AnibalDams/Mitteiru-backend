import type {Response, Request} from 'express'
import { Anime } from '../../classes/animes'


export default async function addReview(req:Request, res:Response) {
    try {
        const animeId = req.params.animeId
        const {review, profileId, profileName, profileImage,title} = req.body.review
        const addReview = await new Anime(animeId).addReview(review,title,profileId, profileName, profileImage)
        switch(addReview.message){
            case "Success":
                res.statusCode=201
                res.json(addReview)
                break
            case "There was an error while getting the reviews":
                res.statusCode=500
                res.json(addReview)
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    }
}