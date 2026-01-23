import type { Request, Response } from "express";
import type IlearningProgress from "../../classes/interfaces/LearningProgress";
import LearningProgress from "../../classes/LearnginProgress";

export default async function addLearningProgress(req: Request, res: Response) {
  try {
    const data = req.body as IlearningProgress;

    const newLearningProgress = await new LearningProgress(data).new();

    switch (newLearningProgress.message) {
      case "Learning progress already exists":
        res.statusCode = 200;
        res.json(newLearningProgress);
        break;
      case "success":
        res.statusCode = 201;
        res.json(newLearningProgress);
        break;
      case "An error has occurred":
        res.statusCode = 500;
        res.json(newLearningProgress);
        break;
    }
  } catch (error: any) {
    return { message: "There was an error", error: error.message };
  }
}
