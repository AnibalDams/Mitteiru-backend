import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";
import getRandomInt from "../libs/randomNumber";
import Genre from "./genres";
export class Anime {
  id: number;
  name: string;
  japaneseName: string;
  synopsis: string;
  releaseYear: string;
  studio: string;
  cover: string;
  image: string;
  onGoing: number;
  horizontalImage: string;
  genres: string[];
  public constructor(
    id: number = 0,
    name: string = "",
    japaneseName: string = "",
    synopsis: string = "",
    releaseYear: string = "",
    studio: string = "",
    cover: string = "",
    image: string = "",
    onGoing: number = 0,
    horizontalImage: string = "",
    genres: string[] = [""]
  ) {
    this.id = id;
    this.name = name;
    this.japaneseName = japaneseName;
    this.synopsis = synopsis;
    this.releaseYear = releaseYear;
    this.studio = studio;
    this.cover = cover;
    this.image = image;
    this.onGoing = onGoing;
    this.horizontalImage = horizontalImage;
    this.genres = genres;
  }
  new(): ReturnData {
    const createAnimeQuery = database.query(`
            INSERT INTO Animes(name,japanese_name,synopsis,release_year,studio,cover,image,horizontal_image,on_going,views_) VALUES($name,$japanese_name,$synopsis,$release_year,$studio,$cover,$image,$horizontal_image,$on_going,0)`);
    try {
      let createAnime = createAnimeQuery.run({
        $name: this.name,
        $japanese_name: this.japaneseName,
        $synopsis: this.synopsis,
        $release_year: this.releaseYear,
        $studio: this.studio,
        $cover: this.cover,
        $image: this.image,
        $horizontal_image: this.horizontalImage,
        $on_going: this.onGoing,
      });
      const animeId = createAnime.lastInsertRowid;
      for (let i = 0; i < this.genres.length; i++) {
        const genre = this.genres[i];
        const doesTheGenreExistQuery = database.query(
          `SELECT id FROM Genre WHERE name=$name`
        );
        const doesTheGenreExist = doesTheGenreExistQuery.all({ $name: genre });
        if (doesTheGenreExist.length <= 0) {
          database
            .query(`INSERT INTO Genre(name) VALUES ($name)`)
            .run({ $name: genre });
          database
            .query(`INSERT INTO Genres(name,anime_id) VALUES($name,$anime_id)`)
            .run({ $name: genre, $anime_id: animeId });
        } else {
          database
            .query(`INSERT INTO Genres(name,anime_id) VALUES($name,$anime_id)`)
            .run({ $name: genre, $anime_id: animeId });
        }
      }
      return {
        message: "The anime has been created successfully",
      };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating an Anime",
        error: error.message,
      };
    }
  }

  getAll(): ReturnData {
    const getAllAnimeQuery = database.query(
      `SELECT * FROM Animes ORDER BY Animes.id DESC`
    );

    try {
      const animes = getAllAnimeQuery.all();

      return { message: "animes found", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting animes",
        error: error.message,
      };
    }
  }

  getById(): ReturnData {
    const getByAnimeByIdQuery = database.query(
      `SELECT * from Animes WHERE id=$id`
    );
    try {
      const anime: any = getByAnimeByIdQuery.get({ $id: this.id });
      const views = anime.views_ == null ? 0 : anime.views_ + 1;
      if (anime != null) {
        database
          .query(`UPDATE Animes SET views_=$views WHERE id=$animeId`)
          .run({ $views: views, $animeId: anime.id });
      }
      const getGenres = anime
        ? database
            .query(`SELECT * FROM Genres WHERE anime_id=$animeId`)
            .all({ $animeId: anime.id })
        : [];
      return { message: "anime found", animes: anime, genres: getGenres };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  getAnimesOfAnStudio(): ReturnData {
    try {
      const animes = database
        .query(`SELECT * FROM Animes WHERE studio=$studio`)
        .all({$studio:this.studio});
      return { message: "success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  getMostPopular(): ReturnData {
    const getMostPopularAnime = database.query(
      `SELECT * FROM Animes ORDER BY views_ DESC LIMIT 10`
    );
    try {
      const animes = getMostPopularAnime.all();
      return { message: "success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }

  getSimilar(): ReturnData {
    try {
      const genres: any = database
        .query(`SELECT * FROM Genres WHERE anime_id=$animeId`)
        .all({ $animeId: this.id });
      if (genres.length == 0) {
        return { message: "no genres found" };
      }
      const randomNumber = getRandomInt(0, genres ? genres.length - 1 : 1);
      const animes: any[] = [];
      const allAnimes = new Genre(
        0,
        genres ? genres[randomNumber].name : ""
      ).getAnimes();

      for (let i = 0; i < allAnimes.animes.length; i++) {
        const anime = allAnimes.animes[i];

        if (anime.id != this.id) {
          animes.push(anime);
        }
      }
      return { message: "success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the similar Animes",
        error: error.message,
      };
    }
  }

 
}
