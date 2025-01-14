import History from "../../classes/history";
import type { Response, Request } from "express";

export default async function addToHistory(req: Request, res: Response) {
  try {
    const animeId = req.params.animeId;
    const episodeNumber = Number(req.params.episodeNumber);
    const profileId = req.params.profileId;
    const history = await new History("", animeId, episodeNumber, 0,profileId).add();
    switch (history.message) {
      case "Success":
        res.statusCode = 201;
        res.json(history);
        break;
      case "An error has occurred while adding the History":
        res.statusCode = 500;
        res.json(history);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
