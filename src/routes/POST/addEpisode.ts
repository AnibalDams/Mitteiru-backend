import Episode from "../../classes/episodes";
import type { Response, Request } from "express";

export default function addEpisode(req: Request, res: Response):void {
  try {
    const animeId = Number(req.params.animeId);
    const { name,episodeNumber, synopsis, thumbnail, link } = req.body;
    const newEpisode = new Episode(
      0,
      name,
      episodeNumber,
      thumbnail,
      synopsis,
      link,
      animeId
    ).new();

    switch (newEpisode.message) {
      case "The anime does not exist":
        res.statusCode = 404;
        res.json(newEpisode);
        break;
      case "The episode was added to the anime":
        res.statusCode = 200;
        res.json(newEpisode);
        break;
      case "An error has occurred while adding the episode":
        res.statusCode = 500;
        res.json(newEpisode);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}