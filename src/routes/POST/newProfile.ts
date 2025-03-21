import Profile from "../../classes/profiles";
import type { Response, Request } from "express";

export default async function newProfile(req: Request, res: Response){
  try {
    const userId = req.params.userId;
    const { name, photo } = req.body;
    const newProfile =await new Profile("", name, photo, userId).new();

    switch (newProfile.message) {
      case "User not found":
        res.statusCode = 404;
        res.json(newProfile);
        break;
      case "success":
        res.statusCode = 201;
        res.json(newProfile);
        break;
      case "An error has occurred while creating profile":
        res.statusCode = 500;
        res.json(newProfile);
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: "There was an error", error: error.message });
  }
}
