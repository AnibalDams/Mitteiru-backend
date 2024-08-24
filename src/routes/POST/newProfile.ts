import Profile from "../../classes/profiles";
import type { Response, Request } from "express";

export default function newProfile(req: Request, res: Response): void {
  try {
    const userId = Number(req.params.userId);
    const { name, photo } = req.body;
    const newProfile = new Profile(0, name, photo, userId).new();

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
