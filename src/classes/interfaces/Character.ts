import type { ObjectId } from "mongodb"

export interface ExtraInformation{
    name:string
    value:string

}

export interface Character {
    _id?:ObjectId|undefined
    animeId:string|ObjectId
    name:string
    japaneseName:string
    age:string
    gender:string
    height:string
    extraInformation:ExtraInformation[]
    description:string
    likes:number    
    image:string
    
}