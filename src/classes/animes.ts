import { ObjectId } from "mongodb";
import dbClient from "../libs/dbClient";
import type ReturnData from "../libs/types/returnData";
import getRandomInt from "../libs/randomNumber";
import Genre from "./genres";
export class Anime {
  id: string;
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
    id: string = "",
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
      const verifyAnime = await dbClient
        .collection("anime")
        .findOne({ name: this.name });

      if (verifyAnime != null) {
        dbClient.collection("anime").findOneAndUpdate(
          { name: this.name },
          {
            $set: {
              name: this.name,
              japaneseName: this.japaneseName,
              synopsis: this.synopsis,
              releaseYear: this.releaseYear,
              studio: this.studio,
              cover: this.cover,
              image: this.image,
              horizontalImage: this.horizontalImage,
              onGoing: this.onGoing,
            },
          }
        );

        console.log("anime updated");
        return {
          message: "The anime has been created successfully",
        };
      }
      const newAnime = await dbClient.collection("anime").insertOne({
        name: this.name,
        japaneseName: this.japaneseName,
        synopsis: this.synopsis,
        releaseYear: this.releaseYear,
        studio: this.studio,
        cover: this.cover,
        image: this.image,
        horizontalImage: this.horizontalImage,
        onGoing: this.onGoing,
        genres: this.genres,
        createdAt: new Date().getTime(),
        views: 0,
        likes:0
      });

      const animeId = newAnime.insertedId;

      for (let i = 0; i < this.genres.length; i++) {
        const genre = this.genres[i];
        const doesTheGenreExist = await dbClient
          .collection("genres")
          .findOne({ name: genre });
        if (doesTheGenreExist == null) {
          await dbClient.collection("genres").insertOne({ name: genre });
          await dbClient
            .collection("genreAnime")
            .insertOne({ name: genre, animeId: animeId });
        } else {
          await dbClient
            .collection("genreAnime")
            .insertOne({ name: genre, animeId: animeId });
        }
      }
      return {
        message: "The anime has been created successfully",
      };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while creating an Anime",
        error: error.message,
      };
    }
  }

  async getAll(): Promise<ReturnData> {
    try {
      const animes = (await dbClient.collection("anime").find().toArray()).sort((a, b) => b.date - a.date);
      return { message: "animes found", animes: animes };
    } catch (error: any) {
      console.log(error)
      return {
        message: "An error has occurred while getting animes",
        error: error.message,
      };
    }
  }

  async getById(): Promise<ReturnData> {
    try {
      const anime: any = await dbClient.collection("anime").findOneAndUpdate(
        { _id: new ObjectId(this.id) },
        { $inc: { views: 1 } },
        { returnDocument: "after" }
      );

    

      return { message: "anime found", animes: anime };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  async getAnimesOfAnStudio(): Promise<ReturnData> {
    try {
      const animes = (await (dbClient.collection("anime").find({ studio: this.studio }).toArray())).sort((a, b) => b.date - a.date)
      return { message: "success", animes: animes };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  async getMostPopular(): Promise<ReturnData> {
    try {
      const animes = await dbClient.collection("anime").find().sort({ views: -1 }).limit(12).toArray()

      return { message: "success", animes: animes };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }

  async getSimilar(): Promise<ReturnData> {
    try {
      const animeG: any = await dbClient.collection("anime").findOne({ _id: new ObjectId(this.id) })

      if (animeG === null) {
        return { message: "no anime found" };
      }
      const randomNumber = getRandomInt(0, animeG.genres.length - 1);
      const animes: any[] = [];
      const allAnimes = await new Genre(
        "",
        animeG.genres[randomNumber]
      ).getAnimes();

      for (let i = 0; i < allAnimes.animes.length; i++) {
        const anime = allAnimes.animes[i];

        if (anime._id.toString() != this.id) {
          animes.push(anime);
        }
      }
      return { message: "success", animes: animes };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the similar Animes",
        error: error.message,
      };
    }
  }
  async getAnimesOfAYear(): Promise<ReturnData> {
    try {
      const animes = await dbClient.collection("anime").find({ releaseYear: this.releaseYear }).toArray()
      return { message: "Success", animes: animes };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the animes",
        error: error.message,
      };
    }
  }
  async addLike(profileId: string): Promise<ReturnData> {
    try {

      console.log("Function started");
      console.log("Verifying like");
      const anime = await dbClient.collection("anime").findOne({ _id: new ObjectId(this.id) })
      const verifyLike = await dbClient.collection("likes").findOne({ profileId: new ObjectId(profileId), animeId: new ObjectId(this.id) })
  

      console.log("Done");
      if (verifyLike != null) {
        console.log("There is a like, deleting it");
        await dbClient.collection("likes").findOneAndDelete({ profileId: new ObjectId(profileId), animeId: new ObjectId(this.id) })
        await dbClient.collection("anime").findOneAndUpdate({ _id: new ObjectId(this.id) }, { $set: { likes: anime?.likes - 1 } })

        return { message: "success 1" };
      }
      console.log("There is no like, adding");
      await dbClient.collection("likes").insertOne({ animeId: new ObjectId(this.id), profileId: new ObjectId(profileId) })
      await dbClient.collection("anime").findOneAndUpdate({ _id: new ObjectId(this.id) }, { $set: { likes: anime?.likes + 1 } })


      console.log("done");
      return { message: "success 2" };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while adding the like",
        error: error.message,
      };
    }
  }
  async getLikes(): Promise<ReturnData> {
    try {
      const anime:any = await dbClient.collection("anime").findOne({ _id: new ObjectId(this.id) })
      const profilesLiked = await dbClient.collection("likes").find({ animeId: new ObjectId(this.id) }).toArray()

      return { message: "Success", likesCount:  anime.likes, profiles: profilesLiked };
    } catch (error: any) {
      console.error(error)

      return { message: "An error has occurred", error: error.message };
    }
  }
  async getMostLiked(): Promise<ReturnData> {
    try {
      const mostLikedAnimes = (await dbClient.collection("anime").find().toArray()).sort((a,b)=>b.likes-a.likes)

      return { message: "success", animes: mostLikedAnimes };
    } catch (error: any) {
      console.error(error)

      return {
        message: "An error has occurred while getting the most liked animes",
        error: error.message,
      };
    }
  }
  async addReview(review:string, title:string,profileId:string, profileName:string, profileImage:string):Promise<ReturnData>{
    try {
      await dbClient.collection("reviews").insertOne({review:review, animeId:this.id, title, profileId, profileName, profileImage,createdAt:new Date().getTime()})
      return {message:"Success"}
    } catch (error:any) {
      console.error(error)
      return {message:"There was an error while adding the review", error:error.message}
    }
  }

  async getAllReviews():Promise<ReturnData>{
    try {
      const reviews = await dbClient.collection("reviews").find({animeId:this.id}).sort({createdAt:-1}).toArray()
      return {message:"Success", reviews:reviews}
    } catch (error:any) {
      return {message:"There was an error while getting the reviews", error:error.message}
    }
  }
  async getReviewById(reviewId:string):Promise<ReturnData>{
    try {
      const review = await dbClient.collection("reviews").findOne({animeId:this.id,_id:new ObjectId(reviewId)})
      if (review==null) {
        return {message:"Review not found"}
      }
      return {message:"Success", reviews:review}
    } catch (error:any) {
      return {message:"There was an error while getting the review", error:error.message}
    }
  }
}
