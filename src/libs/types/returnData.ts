import type { Character } from "../../classes/interfaces/Character";
import type { Anime_ as Ianime } from "./Anime";

interface List{
  id: number
  name: string
  profileId:number
}


export default interface ReturnData {
    message: string;
    animes?: Ianime|Ianime[];
    episodes?:any;
    reviews?:any;
    error?: string | null;
    genres?:any[];
    user?:any
    profiles?:any
    lists?:List[]|unknown[]
    likesCount?:Number
    comments?:any
    commentsLikes?:any
    characters?:Character|Character[]
  }