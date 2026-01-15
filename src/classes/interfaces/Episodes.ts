import type { ObjectId } from "mongodb";

export interface Episode {
    _id?: ObjectId | undefined
    name: string
    synopsis: string
    thumbnail: string
    link: string
    animeId: string | ObjectId
    episodeNumber: number
    external: boolean
}