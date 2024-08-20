import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";

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
            INSERT INTO Animes(name,japanese_name,synopsis,release_year,studio,cover,image,horizontal_image,on_going) VALUES($name,$japanese_name,$synopsis,$release_year,$studio,$cover,$image,$horizontal_image,$on_going)`);
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
        error: null,
      };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating an Anime",
        error: error.message,
      };
    }
  }

  getAll(): ReturnData {
    const getAllAnimeQuery = database.query(`SELECT * FROM Animes`);

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

  getById(): ReturnData{
    const getByAnimeByIdQuery = database.query(`SELECT * from Animes WHERE id=$id`)
    try {
      const anime:any= getByAnimeByIdQuery.get({$id:this.id});
      const getGenres = anime?database.query(`SELECT * FROM Genres WHERE anime_id=$animeId`).all({$animeId:anime.id}):[]
      return {message:"anime found", animes: anime, genres: getGenres}
    } catch (error:any) {
      return {message:"An error has occurred while getting the animes", error: error.message}
    }
  }
}
