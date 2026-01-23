import type { Request, Response } from "express";
import LearningProgress from "../../classes/LearnginProgress";


export default async function getLearningProgress(req: Request, res: Response){
    try{
        const profileId = req.params.profileId;
        const animeId = req.params.animeId;
        const learningProgress = await LearningProgress.get(profileId, animeId);

        switch(learningProgress.message){
            case "Learning progress not found":
                res.statusCode = 200;
                res.json(learningProgress);
                break;
            case "success":
                res.statusCode = 200;
                res.json(learningProgress);
                break;
            case "An error has occurred":
                res.statusCode = 500;
                res.json(learningProgress);
                break;
        }
    }
    catch(error:any){
        res.statusCode = 500;
        res.json({message: "There was an error", error: error.message})
    }
    
}