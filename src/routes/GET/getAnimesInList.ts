import AnimesInList from '../../classes/animesInList'
import type {Response, Request} from 'express'

export default async function getAnimesInList(req:Request, res:Response){
    try {
        const profileId =req.params.profileId
        const animes = await new AnimesInList("","","",profileId).getAll()
        switch(animes.message){
            case "success":
                res.statusCode = 200
                res.json(animes)
                break
            case "An error occurred":
                res.statusCode = 500
                res.json(animes)
            }

    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    }
}