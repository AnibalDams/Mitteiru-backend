import AnimeInList from "../../classes/animesInList";
import type { Response, Request } from "express";

export default async function removeAnimeFromList(req: Request, res: Response) {
  try {
    const animeId = req.params.animeId;
    const listId = req.params.listId;
    const removeAnime =await new AnimeInList("", animeId, listId, "").removeFromList();
    switch (removeAnime.message) {
      case "success":
        res.statusCode = 200;
        res.json(removeAnime);
        break;
      case "An error occurred":
        res.statusCode = 500;
        res.json(removeAnime);
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
