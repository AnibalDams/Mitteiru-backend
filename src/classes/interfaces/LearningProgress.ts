import type { ObjectId } from "mongodb";

export default interface LearningProgress {
  _id?: string | ObjectId;
  score: string;
  understandingProgress: number;
  notes: string;
  profileId: string | ObjectId;
  animeId: string | ObjectId;
}
