import List from "../../classes/lists";
import type { Response, Request } from "express";

export default function newList(req: Request, res: Response): void {
  try {
    const profileId = Number(req.params.profileId);
    const { name } = req.body;
    const newList = new List(0, name, profileId).new();
    switch (newList.message) {
      case "profile not found":
        res.statusCode = 404;
        res.json(newList);
        break;
      case "Success":
        res.statusCode = 201;
        res.json(newList);
        break;
      case "An error occurred":
        res.statusCode = 500;
        res.json(newList);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
