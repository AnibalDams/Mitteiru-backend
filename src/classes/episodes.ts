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

  new(): ReturnData {
    const newEpisodeQuery = database.query(
      "INSERT INTO Episodes(name,episode_number,synopsis,thumbnail,link,anime_id) VALUES($name,$episodeNumber,$synopsis,$thumbnail,$link,$animeId)"
    );

    try {
      const doesTheAnimeExist = new Anime(this.animeId).getById();

      if (!doesTheAnimeExist.animes) {
        return { message: "The anime does not exist" };
      } else {
        newEpisodeQuery.run({
          $name: this.name,
          $episodeNumber: this.episodeNumber,
          $synopsis: this.synopsis,
          $thumbnail: this.thumbnail,
          $link: this.link,
          $animeId: this.animeId,
        });
        return { message: "The episode was added to the anime" };
      }
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the episode",
        error: error.message,
      };
    }
  }
}
