import { ObjectId } from "mongodb";

export interface Anime_{
    _id?: string|ObjectId;
    name: string;
    japaneseName: string;
    synopsis: string;
    releaseYear: string;
    studio: string;
    cover: string;
    image: string;
    onGoing: number;
    createdAt:number;
    horizontalImage: string;
    genres: string[];
    views:number;
    likes:number;
    listId?:string|ObjectId;
    id2?:string|ObjectId;


}