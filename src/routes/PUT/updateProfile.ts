import Profile from "../../classes/profiles";
import type {Response, Request} from 'express'

export default async function updateProfile(req:Request, res:Response){

    try {
        const profileId = Number(req.params.profileId)
        const {name,photo} = req.body
        const update = await new Profile(profileId,name,photo,0).update()
        switch(update.message){
            case "success":
                res.statusCode = 200
                res.json(update)
                break
            case "An error has occurred while updating the profile":
                res.statusCode = 500
                res.json(update)
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"there was an error updating profile", error:error.message})
    }
}