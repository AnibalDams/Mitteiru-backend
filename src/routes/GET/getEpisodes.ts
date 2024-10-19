import type { Response, Request } from "express";
import Episode from "../../classes/episodes";

export default async function getEpisodes(req: Request, res: Response){
  try {
    const animeId = Number(req.params.animeId);
    const episodes = await new Episode(0,"",0,"","","",animeId).getAll();

    switch (episodes.message) {
      case "The anime does not exist":
        res.statusCode = 404;
        res.json(episodes);
        break;
      case "success":
        res.statusCode = 200;
        res.json(episodes);
        break;
      case "An error has occurred while getting the episodes":
        res.statusCode = 500;
        res.json(episodes);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
