import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";

export default class Genre {
  id: number;
  name: string;
  animeId: number;

  constructor(id: number = 0, name: string = "", animeId: number = 0) {
    this.id = id;
    this.name = name;
    this.animeId = animeId;
  }

  async getAll(): Promise<ReturnData> {
    try {
      const genres = await database.sql`SELECT * FROM Genre ORDER BY name ASC`;
      return { message: "Success", genres: genres };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
  async getAnimes(): Promise<ReturnData> {
    try {
      const animes =
        await database.sql`SELECT Animes.id, Animes.name, Animes.japanese_name, Animes.release_year,Animes.studio,Animes.horizontal_image, Animes.cover FROM Genres INNER JOIN Animes ON Animes.id = Genres.anime_id WHERE Genres.name = ${this.name}`;

      return { message: "Success", animes: animes };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
}
