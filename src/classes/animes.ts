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
  async new(): Promise<ReturnData> {
   
    try {
      const verifyAnime =await database
        .sql`
        SELECT id FROM Animes WHERE name=${this.name}`
        
      if (verifyAnime) {
        database
          .sql
            `
            UPDATE Animes SET name=${this.name},japanese_name=${this.japaneseName},synopsis=${this.synopsis},release_year=${this.releaseYear},studio=${this.studio},cover=${this.cover},image=${this.image},horizontal_image=${this.horizontalImage},on_going=${this.onGoing} WHERE name=${this.name}`
          
        console.log("anime updated");
        return {
          message: "The anime has been created successfully",
        };
      }
      await database.sql`
        INSERT INTO Animes(name,japanese_name,synopsis,release_year,studio,cover,image,horizontal_image,on_going,views_) VALUES(${this.name},${this.japaneseName},${this.synopsis},${this.releaseYear},${this.studio},${this.cover},${this.image},${this.horizontalImage},${this.onGoing},0)`;
        
      const getAnimeId =  await database.sql`
      USE DATABASE db.sqlite;
      SELECT id FROM Animes WHERE name=${this.name}
      
      `;
      const animeId = getAnimeId[0].id;


      for (let i = 0; i < this.genres.length; i++) {
        const genre = this.genres[i];
        const doesTheGenreExist =await database.sql
          `SELECT id FROM Genre WHERE name=${genre}`
        ;
   
        if (doesTheGenreExist.length <= 0) {
          await database
            .sql`INSERT INTO Genre(name) VALUES (${genre})`
            
          await database
            .sql`INSERT INTO Genres(name,anime_id) VALUES(${genre},${animeId})`
            
        } else {
          await database
            .sql`INSERT INTO Genres(name,anime_id) VALUES(${genre},${animeId})`
            
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

  async getAll():Promise<ReturnData> {
    try {
      const getAnimes =  await database.sql`
      SELECT * FROM Animes ORDER BY Animes.id DESC`
      const animes = await getAnimes
      return { message: "animes found", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting animes",
        error: error.message,
      };
    }
  }

  async getById():Promise<ReturnData> {

    try {
      const anime: any = await database.sql
      `SELECT * from Animes WHERE id=${this.id}`;
      const views = anime[0].views_ == null ? 0 : anime[0].views_ + 1;
      if (anime[0] != null) {
        await database
          .sql`UPDATE Animes SET views_=${views} WHERE id=${anime[0].id}`
          
      }
      const getGenres = anime[0]
        ? await database
            .sql`SELECT * FROM Genres WHERE anime_id=${anime[0].id}`
        : [];
      return { message: "anime found", animes: anime[0], genres: getGenres };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  async getAnimesOfAnStudio():Promise< ReturnData> {
    try {
      const animes = await database
        .sql`SELECT * FROM Animes WHERE studio=${this.studio}`
      return { message: "success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
 async getMostPopular(): Promise<ReturnData> {
    try {
      const animes = await database.sql
      `SELECT * FROM Animes ORDER BY views_ DESC LIMIT 10`
    ;
      return { message: "success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }

async  getSimilar():Promise< ReturnData> {
    try {
      const genres =await database
        .sql`SELECT * FROM Genres WHERE anime_id=${this.id}`
      if (genres.length == 0) {
        return { message: "no genres found" };
      }
      const randomNumber = getRandomInt(0, genres ? genres.length - 1 : 1);
      const animes: any[] = [];
      const allAnimes =await new Genre(
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
  async getAnimesOfAYear():Promise< ReturnData> {
    try {
      const animes = await database
        .sql`SELECT * FROM Animes WHERE release_year=${this.releaseYear}`
      return { message: "Success", animes: animes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  async addLike(profileId: number): Promise<ReturnData> {
    try {
      console.log("Function started");
      console.log("Verifying like");
      const verifyLike = await database
        .sql
          `SELECT * FROM Likes WHERE profile_id=${profileId} AND anime_id=${this.id}`
        
       

      console.log("Done");
      if (verifyLike) {
        console.log("There is a like, deleting it");
        await database
          .sql
            `DELETE FROM Likes WHERE profile_id=${profileId} AND anime_id=${this.id}`
          

        return { message: "success 1" };
      }
      console.log("There is no like, adding");
     await database
        .sql
          `INSERT INTO Likes(anime_id, profile_id) VALUES(${this.id},${profileId})`
        

      console.log("done");
      return { message: "success 2" };
    } catch (error: any) {
      return {
        message: "An error has occurred while adding the like",
        error: error.message,
      };
    }
  }
  async getLikes():Promise< ReturnData> {
    try {
      const likes = await database
        .sql`SELECT profile_id FROM Likes WHERE anime_id=${this.id}`
      return { message: "Success", likesCount: likes.length, profiles: likes };
    } catch (error: any) {
      return { message: "An error has occurred", error: error.message };
    }
  }
  async getMostLiked():Promise< ReturnData> {
    try {
      const mostLikedAnimes =await database.sql`
        SELECT Animes.*, COUNT(Likes.anime_id) AS like_count
        FROM Animes
        LEFT JOIN Likes ON Animes.id = Likes.anime_id
        GROUP BY Animes.id
        ORDER BY like_count DESC
        LIMIT 10; 
      `;


      return { message: "success", animes: mostLikedAnimes };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the most liked animes",
        error: error.message,
      };
    }
  }
}
