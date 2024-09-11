import History from "../../classes/history";
import type { Response, Request } from "express";

export default function getHistory(req: Request, res: Response) {
  try {
    const profileId = Number(req.params.profileId);
    const getH = new History(0, 0, 0, 0, profileId).get();
    switch (getH.message) {
      case "Success":
        res.statusCode = 200;
        res.json(getH);
        break;
      case "An error has occurred while getting the History":
        res.statusCode = 500;
        res.json(getH);
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
