import type { Request, Response } from "express";
import Character from "../../classes/characters";


export default async function addCharacterToAnime(req: Request, res: Response): Promise<void> {
    try {
        const { name, japaneseName, age, gender, height, extraInformation, description, image } = req.body
        const newCharacter = await new Character(req.params.animeId, name, japaneseName, age, gender, height, extraInformation, description, image).new()

        switch (newCharacter.message) {
            case "All fields are required":
                res.statusCode = 400
                res.json(newCharacter)

                break;
            case "Anime not found":
                res.statusCode = 404
                res.json(newCharacter)
                break;
            case "success":
                res.statusCode = 201
                res.json(newCharacter)
                break;
            case "An error has occurred":
                res.statusCode = 500
                res.json(newCharacter)
                break;
            default:
                break;
        }
    } catch (error: any) {
        res.statusCode = 500
        res.json({ message: "There was an error", error: error.message })
    }
}