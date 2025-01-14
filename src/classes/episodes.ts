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
    episodeNumber: number =0,
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

  async new():Promise<ReturnData> {

    try {
      const doesTheAnimeExist = await new Anime(this.animeId).getById();

      if (!doesTheAnimeExist.animes === null) {
        return { message: "The anime does not exist" };
      } else {
        const verifyEpisode =await dbClient.collection("episodes").findOne({episodeNumber:this.episodeNumber, animeId:new ObjectId(this.animeId)})
        
        if (verifyEpisode != null) {
          await dbClient.collection("episodes").findOneAndUpdate({_id:verifyEpisode._id},{$set:{
            name:this.name,
            synopsis:this.synopsis,
            thumbnail:this.thumbnail,
            link:this.link
          }})
          
          console.log("episode updated")
          return { message: "The episode was added to the anime"}
        }
        await dbClient.collection("episodes").insertOne({
          name:this.name,
          synopsis:this.synopsis,
          thumbnail:this.thumbnail,
          link:this.link,
          animeId:new ObjectId(this.animeId),
          episodeNumber:this.episodeNumber

        })

        return { message: "The episode was added to the anime" };
      }
    } catch (error: any) {
      console.error(error)
      return {
        message: "An error has occurred while adding the episode",
        error: error.message,
      };
    }
  }

 async getAll():Promise<ReturnData> {
    

    try{
      const doesTheAnimeExist =await new Anime(this.animeId).getById();
      if (!doesTheAnimeExist.animes === null) {
        return { message: "The anime does not exist" };
      }
      const episodes = await dbClient.collection("episodes").find({animeId:new ObjectId(this.animeId)}).toArray()
      return {message:"success",episodes:episodes}
    

    }catch (error:any) {
      return{message:"An error has occurred while getting the episodes", error:error.message}
    }
  }
}
