import Profile from "../../classes/profiles";
import type { Response, Request } from "express";

export default async function getAllProfiles(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const allProfiles = await new Profile(0, "", "", userId).getAll();
    switch (allProfiles.message) {
      case "User not found":
        res.statusCode = 404;
        res.json(allProfiles);
        break;
      case "success":
        res.statusCode = 200;
        res.json(allProfiles);
        break;
      case "An error has occurred while getting all profiles":
        res.statusCode = 500;
        res.json(allProfiles);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
