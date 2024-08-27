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

  addToList(): ReturnData {
    const addToList = database.query(
      `INSERT INTO Anime_lists(anime_id,list_id) VALUES($animeId, $listId)`
    );
    try {
      addToList.run({ $animeId: this.animeId, $listId: this.listId });
      return { message: "success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

  removeFromList(): ReturnData {
    const removeFromList = database.query(
      `DELETE FROM Anime_lists WHERE anime_id=$animeId AND list_id=$listId`
    );
    try {
      removeFromList.run({ $animeId: this.animeId, $listId: this.listId });
      return { message: "success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

  getAll(): ReturnData {
    let animes = [];

    const getAnimes = database.query(
      `SELECT Animes.id, Animes.name, Animes.japanese_name, Animes.synopsis, Animes.release_year,Animes.cover, Animes.studio,Animes.image,Animes.on_going, Anime_lists.list_id FROM Anime_lists INNER JOIN Animes ON Animes.id = Anime_lists.anime_id WHERE list_id=$listId`
    );
    try {
      const allLists = database
        .query(`SELECT id, name FROM List WHERE profile_id=$profileId`)
        .all({ $profileId: this.profileId });
      for (let i = 0; i < allLists.length; i++) {
        const list: any = allLists[i];
        const animesInList: any = getAnimes.all({
          $listId: list.id ? list.id : 0,
        });
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
