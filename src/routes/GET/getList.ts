import List from "../../classes/lists";
import type { Response, Request } from "express";

export default async function getLists(req: Request, res: Response) {
  try {
    const profileId = req.params.profileId;
    const allLists = await new List(0, "", profileId).getAll();
    switch (allLists.message) {
      case "Profile not found":
        res.statusCode = 404;
        res.json(allLists);
        break;
      case "Success":
        res.statusCode = 200;
        res.json(allLists);
        break;
      case "An error occurred":
        res.statusCode = 500;
        res.json(allLists);
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
