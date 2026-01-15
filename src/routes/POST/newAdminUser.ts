import type { Request, Response } from "express";
import AdminUser from "../../classes/AdminUser";


export default async function newAdminUser(req: Request, res: Response){
    try {
        const {email, password} = req.body
        const newAUser =await new AdminUser("",email,password,false).new()

        switch(newAUser.message){
            case "User already exists":
                res.statusCode = 200
                res.json(newAUser)
                break
            case "success":
                res.statusCode = 201
                res.json(newAUser)
                break
            case "An error has occurred":
                res.statusCode = 500
                res.json(newAUser)
                break
        }
        
    } catch (error:any) {
        res.statusCode = 500
        res.json({message:"There was an error", error:error.message})
    
    }
}