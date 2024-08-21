import type { Request, Response } from "express";
import { Anime } from "../../classes/animes";

export default function newAnime(req: Request, res: Response):void {
  try {
    const {
      name,
      japaneseName,
      synopsis,
      releaseYear,
      studio,
      cover,
      image,
      onGoing,
      horizontalImage,
      genres,
    } = req.body;
    const anime = new Anime(
      0,
      name,
      japaneseName,
      synopsis,
      releaseYear,
      studio,
      cover,
      image,
      onGoing,
      horizontalImage,
      genres
    );

    let createAnime = anime.new();
    switch (createAnime.message) {
      case "The anime has been created successfully":
        res.statusCode = 201;
        res.json(createAnime);
        break;
      case "An error has occurred while creating an Anime":
        res.statusCode = 500
        res.json(createAnime);
        break;

      default:
        break;
    }
  } catch (error:any) {
    res.statusCode = 500
    res.json({ message: "There was an error",error:error.message });
  }
}
