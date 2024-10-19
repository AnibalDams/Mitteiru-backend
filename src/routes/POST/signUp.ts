import User from '../../classes/users'
import type {Response, Request} from 'express'

export default async function signUp(req:Request, res:Response){
    try {
        const{username,email,password} = req.body
        const user = new User(username, email, password)
        const createUser =await user.create()

        switch(createUser.message){
            case "Username already used":
                res.statusCode = 200
                res.json(createUser)
                break
            case "email already used":
                res.statusCode = 200
                res.json(createUser)
                break
            case "User created successfully":
                res.statusCode = 201
                res.json(createUser)
                break
            case "An error has occurred while creating the user":
                res.statusCode = 500
                res.json(createUser) 
                break       
        
        }
    } catch (error:any) {
        res.statusCode = 500
        res.json({ error: error.message,message:"There was an error" })
    }
}