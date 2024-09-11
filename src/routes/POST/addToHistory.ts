import History from "../../classes/history";
import type { Response, Request } from "express";

export default function addToHistory(req: Request, res: Response) {
  try {
    const animeId = Number(req.params.animeId);
    const episodeNumber = Number(req.params.episodeNumber);
    const profileId = Number(req.params.profileId);
    const history = new History(0, animeId, episodeNumber, 0,profileId).add();
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
