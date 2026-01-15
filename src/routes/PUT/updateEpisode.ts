import type { Request, Response } from "express";
import type { Episode as IEpisode } from "../../classes/interfaces/Episodes";
import Episode from "../../classes/episodes";


export default async function updateEpisode(req: Request, res: Response) {
    try {
        const { episodeId } = req.params
        const data: IEpisode = req.body
        const update = await Episode.update(episodeId, data)

        switch (update.message) {
            case "The episode was updated successfully":
                res.statusCode = 200
                res.json(update)
                break
            case "The episode does not exist":
                res.statusCode = 404
                res.json(update)
                break
            case "An error has occurred":
                res.statusCode = 500
                res.json(update)
                break
        }


    } catch (error: any) {
        res.statusCode = 500
        res.json({ message: "there was an error updating episode", error: error.message })
    }
}