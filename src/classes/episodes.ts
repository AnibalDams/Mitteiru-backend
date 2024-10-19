import database from "../libs/db";
import { Anime } from "./animes";
import type ReturnData from "../libs/types/returnData";

export default class Episode {
  id: number;
  name: string;
  episodeNumber: number;
  thumbnail: string;
  synopsis: string;
  link: string;
  animeId: number;

  constructor(
    id: number = 0,
    name: string = "",
    episodeNumber: number =0,
    thumbnail: string = "",
    synopsis: string = "",
    link: string = "",
    animeId: number = 0
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

      if (!doesTheAnimeExist.animes) {
        return { message: "The anime does not exist" };
      } else {
        const verifyEpisode =await database.sql`SELECT id FROM Episodes WHERE episode_number=${this.episodeNumber} AND anime_id=${this.animeId}`
        if (verifyEpisode[0]) {
          database.sql`UPDATE Episodes SET name=${this.name},episode_number=${this.episodeNumber},synopsis=${this.synopsis},thumbnail=${this.thumbnail},link=${this.link} WHERE episode_number=${this.episodeNumber} AND anime_id=${this.animeId}`
          
          console.log("episode updated")
          return { message: "The episode was added to the anime"}
        }
        await database.sql
        `INSERT INTO Episodes(name,episode_number,synopsis,thumbnail,link,anime_id) VALUES(${this.name},${this.episodeNumber},${this.synopsis},${this.thumbnail},${this.link},${this.animeId})`
      

        return { message: "The episode was added to the anime" };
      }
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the episode",
        error: error.message,
      };
    }
  }

 async getAll():Promise<ReturnData> {
    

    try{
      const doesTheAnimeExist =await new Anime(this.animeId).getById();
      if (!doesTheAnimeExist.animes) {
        return { message: "The anime does not exist" };
      }
      const episodes = await database.sql`SELECT * FROM Episodes WHERE anime_id=${this.animeId}`;
      return {message:"success",episodes:episodes}
    
    }catch (error:any) {
      return{message:"An error has occurred while getting the episodes", error:error.message}
    }
  }
}
