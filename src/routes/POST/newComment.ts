import type {Response, Request} from 'express'
import Episode from '../../classes/episodes'

export default async function newComment(req:Request, res:Response){
    try {
        const {content, profileId, profileName, profileImage} = req.body
        const episodeId = req.params.episodeId
        const newComment = await new Episode(episodeId).newComment(profileId, content, profileName, profileImage)
        switch(newComment.message) {
            case "Comment added successfully":
                res.statusCode = 201
                res.json(newComment)
                break;
            case "The episode does not exist":
                res.statusCode = 404
                res.json(newComment)
                break;
            case "An error has occurred while adding the comment":
                res.statusCode = 500
                res.json(newComment)
                break;
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({error:error.message})
    }
}