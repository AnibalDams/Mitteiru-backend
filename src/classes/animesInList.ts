import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";

export default class AnimeInList {
  id: number;
  animeId: number;
  listId: number;
  profileId: number;
  constructor(id: number, animeId: number, listId: number, profileId: number) {
    this.id = id;
    this.animeId = animeId;
    this.listId = listId;
    this.profileId = profileId;
  }

 async addToList():Promise< ReturnData> {
    
    try {
    await database.sql
      `INSERT INTO Anime_lists(anime_id,list_id) VALUES(${this.animeId}, ${this.listId})`
      return { message: "success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

  async removeFromList():Promise<ReturnData> {
    try {
      await database.sql
      `DELETE FROM Anime_lists WHERE anime_id=${this.animeId} AND list_id=${this.listId}`
    ;
      return { message: "success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

 async getAll():Promise<ReturnData> {
    let animes = [];

    try {
      const allLists = await database
        .sql`SELECT id, name FROM Lists WHERE profile_id=${this.profileId}`
      for (let i = 0; i < allLists.length; i++) {
        const list: any = allLists[i];
        const animesInList= await database.sql
        `SELECT Animes.id, Animes.name, Animes.japanese_name, Animes.synopsis, Animes.release_year,Animes.cover, Animes.studio,Animes.image,Animes.on_going, Anime_lists.list_id FROM Anime_lists INNER JOIN Animes ON Animes.id = Anime_lists.anime_id WHERE list_id=${list.id ? list.id : 0}`
      ; 
        for (let i = 0; i < animesInList.length; i++) {
          const anime_ = animesInList[i];
          animes.push(anime_);
        }
      }
      return {message:"success", animes:animes}
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
}
