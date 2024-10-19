import AnimeInList from "../../classes/animesInList";
import type { Response, Request } from "express";

export default async function removeAnimeFromList(req: Request, res: Response) {
  try {
    const animeId = Number(req.params.animeId);
    const listId = Number(req.params.listId);
    const removeAnime =await new AnimeInList(0, animeId, listId, 0).removeFromList();
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
