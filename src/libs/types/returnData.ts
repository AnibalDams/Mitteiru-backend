import type { Character } from "../../classes/interfaces/Character";
import type { AdminUser } from "../../classes/interfaces/AdminUser";
import type { Episode } from "../../classes/interfaces/Episodes";
import type { Anime_ as Ianime } from "./Anime";

interface List {
  id: number
  name: string
  profileId: number
}


export default interface ReturnData {
  message: string;
  animes?: Ianime | Ianime[];
  episodes?: Episode | Episode[];
  reviews?: any;
  error?: string | null;
  genres?: any[];
  user?: any
  profiles?: any
  lists?: List[] | unknown[]
  likesCount?: Number
  comments?: any
  commentsLikes?: any
  characters?: Character | Character[]
  AdminUser?: AdminUser | AdminUser[]

}