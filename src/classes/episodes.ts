import database from "../libs/db";
import dbClient from "../libs/dbClient";
import { Anime } from "./animes";
import type ReturnData from "../libs/types/returnData";
import { MongoDBCollectionNamespace, ObjectId } from "mongodb";

export default class Episode {
  id: string;
  name: string;
  episodeNumber: number;
  thumbnail: string;
  synopsis: string;
  link: string;
  animeId: string;

  constructor(
    id: string = "",
    name: string = "",
    episodeNumber: number = 0,
    thumbnail: string = "",
    synopsis: string = "",
    link: string = "",
    animeId: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.episodeNumber = episodeNumber;
    this.synopsis = synopsis;
    this.thumbnail = thumbnail;
    this.link = link;
    this.animeId = animeId;
  }

  async new(): Promise<ReturnData> {
    try {
      const doesTheAnimeExist = await new Anime(this.animeId).getById();

      if (!doesTheAnimeExist.animes === null) {
        return { message: "The anime does not exist" };
      } else {
        const verifyEpisode = await dbClient
          .collection("episodes")
          .findOne({
            episodeNumber: this.episodeNumber,
            animeId: new ObjectId(this.animeId),
          });

        if (verifyEpisode != null) {
          await dbClient.collection("episodes").findOneAndUpdate(
            { _id: verifyEpisode._id },
            {
              $set: {
                name: this.name,
                synopsis: this.synopsis,
                thumbnail: this.thumbnail,
                link: this.link,
              },
            }
          );

          console.log("episode updated");
          return { message: "The episode was added to the anime" };
        }
        await dbClient.collection("episodes").insertOne({
          name: this.name,
          synopsis: this.synopsis,
          thumbnail: this.thumbnail,
          link: this.link,
          animeId: new ObjectId(this.animeId),
          episodeNumber: this.episodeNumber,
        });

        return { message: "The episode was added to the anime" };
      }
    } catch (error: any) {
      console.error(error);
      return {
        message: "An error has occurred while adding the episode",
        error: error.message,
      };
    }
  }

  async getAll(): Promise<ReturnData> {
    try {
      const doesTheAnimeExist = await new Anime(this.animeId).getById();
      if (!doesTheAnimeExist.animes === null) {
        return { message: "The anime does not exist" };
      }
      const episodes = await dbClient
        .collection("episodes")
        .find({ animeId: new ObjectId(this.animeId) })
        .toArray();
      return { message: "success", episodes: episodes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the episodes",
        error: error.message,
      };
    }
  }
  async newComment(
    profileId: string,
    content: string,
    profileName: string,
    profileImage: string
  ): Promise<ReturnData> {
    try {
      const episode = await dbClient
        .collection("episodes")
        .findOne({ _id: new ObjectId(this.id) });
      if (!episode) {
        return { message: "The episode does not exist" };
      }
      await dbClient.collection("comments").insertOne({
        date: new Date().getTime(),
        profileId: profileId,
        content: content,
        profileName: profileName,
        profileImage: profileImage,
        episodeId: new ObjectId(this.id),
      });
      return { message: "Comment added successfully" };
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the comment",
        error: error.message,
      };
    }
  }
  async getComments(): Promise<ReturnData> {
    try {
      const episode = await dbClient
        .collection("episodes")
        .findOne({ _id: new ObjectId(this.id) });
      if (!episode) {
        return { message: "The episode does not exist" };
      }
      const comments = await dbClient
        .collection("comments")
        .find({ episodeId: new ObjectId(this.id) })
        .sort({ date: -1 })
        .toArray();
      return { message: "success", comments: comments };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the comments",
        error: error.message,
      };
    }
  }
  async addLikeToComment(
    commentId: string,
    profileId: string
  ): Promise<ReturnData> {
    try {
      const comment = await dbClient
        .collection("comments")
        .findOne({ _id: new ObjectId(commentId) });
      if (!comment) {
        return { message: "The comment does not exist" };
      }
      const profile = await dbClient
        .collection("profiles")
        .findOne({ _id: new ObjectId(profileId) });
      if (!profile) {
        return { message: "The profile does not exist" };
      }
      const like = await dbClient
        .collection("commentLikes")
        .findOne({
          commentId: new ObjectId(commentId),
          profileId: new ObjectId(profileId),
        });
      if (like) {
        await dbClient.collection("commentLikes").deleteOne({ _id: like._id });
        return { message: "The like was removed successfully" };
      }
      await dbClient.collection("commentLikes").insertOne({
        date: new Date().getTime(),
        commentId: new ObjectId(commentId),
        episodeId:new ObjectId(this.id),
        profileId: new ObjectId(profileId),
      });
      return { message: "The like was added successfully" };
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the like to the comment",
        error: error.message,
      };
    }
  }
  async getLikesOfAComment():Promise<ReturnData>{
    try {
      const commentsLikes = await dbClient.collection("commentLikes").find({episodeId:new ObjectId(this.id)}).toArray()
      return {message:"Success", likesCount:commentsLikes.length, commentsLikes:commentsLikes}
    } catch (error:any) {
      return {message :"An error has occurred while getting the likes", error:error.message}
    }
  }
}
