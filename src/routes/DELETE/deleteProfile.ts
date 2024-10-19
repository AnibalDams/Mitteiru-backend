import Profile from "../../classes/profiles";
import type { Response, Request } from "express";

export default async function defaultProfile(req: Request, res: Response) {
  try {
    const profileId = Number(req.params.profileId);
    const deleteProfile = await new Profile(profileId).delete();
    switch (deleteProfile.message) {
      case "success":
        res.statusCode = 200;
        res.json(deleteProfile);
        break;
      case "An error has occurred while deleting the profile":
        res.statusCode = 500;
        res.json(deleteProfile);
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "there was an error", error: error.message });
  }
}
