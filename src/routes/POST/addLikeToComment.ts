import type { Response, Request } from "express";
import Episode from "../../classes/episodes";

export default async function addLikeToComment(req: Request, res: Response) {
  try {
    const { commentId, profileId,episodeId } = req.params;
    const addLike = await new Episode(episodeId).addLikeToComment(commentId, profileId);
    switch (addLike.message) {
      case "The comment does not exist":
        res.statusCode = 404;
        res.json(addLike);

        break;
      case "The profile does not exist":
        res.statusCode = 404;
        res.json(addLike);
        break;

      case "The like was removed successfully":
        res.statusCode = 200;
        res.json(addLike);
        break;

      case "The like was added successfully":
        res.statusCode = 201;
        res.json(addLike);
        break;
      case "An error has occurred while adding the like to the comment":
        res.statusCode = 500;
        res.json(addLike);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
