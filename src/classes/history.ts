import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";
import moment from "moment";
export default class History {
  id: number;
  animeId: number;
  episodeNumber: number;
  profileId: number;
  date: number;

  constructor(
    id: number,
    animeId: number,
    episodeNumber: number,
    date: number,
    profileId: number
  ) {
    this.id = id;
    this.animeId = animeId;
    this.episodeNumber = episodeNumber;
    this.date = date;
    this.profileId = profileId;
  }

  async add():Promise<ReturnData> {
    try {
      const today = new Date().getTime();
      const todayString = new Date(today).toISOString().substring(0, 10);

      const isThereAnime: any = await database
        .sql
          `SELECT id, date FROM History WHERE anime_id = ${this.animeId} AND profile_id=${this.profileId}`
        
      const dates: any = {};
      for (let i = 0; i < isThereAnime.length; i++) {
        const anime = isThereAnime[i];
        const animeDate = new Date(anime.date).toISOString().substring(0, 10);
        dates[animeDate] = animeDate;
      }
      if (!dates[todayString]) {
        await database
          .sql
            `INSERT INTO history (anime_id, episode_number, date, profile_id) VALUES(${this.animeId}, ${this.episodeNumber},${today},${this.profileId})`
          
      }

      return { message: "Success" };
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the History",
        error: error.message,
      };
    }
  }

  async get():Promise< ReturnData> {
    try {
      const history = await database
        .sql
          `SELECT Animes.id, Animes.name,Animes.japanese_name, Animes.release_year,Animes.studio,Animes.cover, History.date FROM History INNER JOIN Animes ON Animes.id = History.anime_id WHERE profile_id = ${this.profileId} ORDER BY History.date DESC`
        
      const dates: any = [];
      for (let i = 0; i < history.length; i++) {
        const log: any = history[i];
        const date = new Date(log.date).toISOString();

        if (!dates.find((e: any) => e.date === date.substring(0, 10))) {
          dates.push({ date: date.substring(0, 10), animes: [] });
        }
      }
      for (let i = 0; i < history.length; i++) {
        const log: any = history[i];
        const date = new Date(log.date).toISOString();
        if (dates.find((e: any) => e.date === date.substring(0, 10))) {
          const index = dates.findIndex(
            (e: any) => e.date === date.substring(0, 10)
          );
          dates[index].animes.push(log);
        }
      }

      return { message: "Success", animes: dates };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the History",
        error: error.message,
      };
    }
  }
}
