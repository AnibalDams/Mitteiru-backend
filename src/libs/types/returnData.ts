interface List{
  id: number
  name: string
  profileId:number
}


export default interface ReturnData {
    message: string;
    animes?: any;
    episodes?:any;
    reviews?:any;
    error?: string | null;
    genres?:any[];
    user?:any
    profiles?:any
    lists?:List[]|unknown[]
    likesCount?:Number
  }