import type { Request, Response } from "express";
import EpisodeLearningProgress from "../../classes/EpisodeLearningProgress";


export default async function addEpisodeLearningProgress(req:Request, res:Response){
    try {
        const {animeId, episodeId,profileId} = req.params
        const {notes,score,understandingDegree}= req.body
        const add = await new EpisodeLearningProgress(episodeId, animeId,profileId, score,notes,understandingDegree).add() 
        res.statusCode = add.statusCode??200
        res.json(add)
    } catch (error:any) {
        console.error(error)
        res.statusCode = 500
        return res.json({message:"An error has occurred", error:error.message})
    }
}