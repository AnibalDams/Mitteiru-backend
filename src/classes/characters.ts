import type { Character as Icharacter, ExtraInformation as IextraInformation } from "./interfaces/Character";
import type ReturnData from "../libs/types/returnData";
import dbClient from "../libs/dbClient";
import verifyFields from "../libs/fieldsVerifier";
import { Anime } from "./animes";


export default class Character {
    animeId: string
    name: string
    japaneseName: string
    age: string
    gender: string
    height: string
    extraInformation: IextraInformation[]
    description: string
    image: string
    likes: number

    constructor(animeId: string = "", name: string = "", japaneseName: string = "", age: string = "", gender: string = "", height: string = "", extraInformation: IextraInformation[] = [], description: string = "", image: string = "", likes: number = 0) {
        this.animeId = animeId;
        this.name = name;
        this.japaneseName = japaneseName;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.extraInformation = extraInformation;
        this.description = description;
        this.image =image
        this.likes =likes

    }

    async new(): Promise<ReturnData> {
        try {
            const verifyAnime = await new Anime(this.animeId).getById()
            if (!verifyAnime.animes) {
                return { message: "Anime not found" }
            }

            const newCharacter: Icharacter = {

                animeId: this.animeId,
                name: this.name,
                japaneseName: this.japaneseName,
                age: this.age,
                gender: this.gender,
                height: this.height,
                extraInformation: this.extraInformation,
                description: this.description,
                image:this.image,
                likes:this.likes

            }
            if (!verifyFields([this.animeId, this.name, this.japaneseName, this.age, this.gender, this.height, this.description])) {
                return { message: "All fields are required" }
            }
            await dbClient.collection("characters").insertOne(newCharacter)
            return { message: "success" }
        } catch (error: any) {
            console.error(error)
            return { message: "An error has occurred", error: error.message }
        }
    }
}