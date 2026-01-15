import type { Request, Response } from "express";
import AdminUser from "../../classes/AdminUser";


export default async function adminLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const login = await AdminUser.login(email, password)

        switch (login.message) {
            case "User not found":
                res.statusCode = 404
                res.json(login)
                break
            case "User not accepted":
                res.statusCode = 401
                res.json(login)
                break
            case "Invalid password":
                res.statusCode = 401
                res.json(login)
                break
            case "success":
                res.statusCode = 200
                res.json(login)
                break
            case "An error has occurred":
                res.statusCode = 500
                res.json(login)
                break
        }

    } catch (error: any) {
        res.statusCode = 500
        res.json({ message: "There was an error", error: error.message })

    }
}