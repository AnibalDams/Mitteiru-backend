import dbClient from "../libs/dbClient";
import type ReturnData from "../libs/types/returnData";
import { Anime } from "./animes";

export default class Genre {
  id: string;
  name: string;
  animeId: string;

  constructor(id: string = "", name: string = "", animeId: string = "") {
    this.id = id;
    this.name = name;
    this.animeId = animeId;
  }

  async getAll(): Promise<ReturnData> {
    try {

      const genres = (await dbClient.collection("genres").find().toArray()).sort((a,b)=>b.name - a.name)
      return { message: "Success", genres: genres };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
  async getAnimes(): Promise<ReturnData> {
    try {
      const animesWithGenre = await dbClient.collection("genreAnime").find({ name: this.name }).toArray();

      const animes = []

      for (let i = 0; i < animesWithGenre.length; i++) {
        const anime = (await new Anime(animesWithGenre[i].animeId.toString()).getById()).animes;
        animes.push(anime)

      }
      return { message: "Success", animes: animes };
    } catch (error: any) {
      console.error(error)
      return { message: "An error occurred", error: error.message };
    }
  }
}
