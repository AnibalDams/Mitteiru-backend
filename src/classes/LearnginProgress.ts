import dbClient from "../libs/dbClient";
import type ReturnData from "../libs/types/returnData";
import type ILearningProgress from "./interfaces/LearningProgress";

const LearningProgressCollection =
  dbClient.collection<ILearningProgress>("learningProgress");

export default class LearningProgress {
  data: ILearningProgress;

  constructor(data: ILearningProgress) {
    this.data = data;
  }

  async new(): Promise<ReturnData> {
    try {
      const verify = await LearningProgressCollection.findOne({
        profileId: this.data.profileId,
        animeId: this.data.animeId,
      });
      if (verify) {
        await LearningProgressCollection.findOneAndUpdate({_id: verify._id}, {
          $set:this.data
        });
                return { message: "Learning progress already exists" };
      }
      await LearningProgressCollection.insertOne(this.data);
      return { message: "success" };
    } catch (error: any) {
      return { message: "An error has occurred", error: error.message };
    }
  }

  static async get(profileId: string, animeId: string): Promise<ReturnData>{
    try {
      const progress = await LearningProgressCollection.findOne({
        profileId: profileId,
        animeId: animeId,
      });
      if (!progress) {
        return { message: "Learning progress not found" };
      }
      return { message: "success", learningProgress: progress };
    } catch (error:any) {
      return { message: "An error has occurred", error: error.message };
      
    }
  }
}
