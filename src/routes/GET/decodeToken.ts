import User from "../../classes/users";
import type {Response, Request} from 'express'


export default async function decodeToken(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            res.statusCode = 400
            res.json({message:"No token provided"})
            return
        }else{
            const decodedToken = new User("","","").decodeToken(token)
            res.statusCode = 200
            res.json({message:"Token decoded", user:decodedToken})
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    }
}
