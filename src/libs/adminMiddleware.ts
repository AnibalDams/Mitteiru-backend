import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import AdminUser from "../classes/AdminUser";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            res.statusCode = 403
            res.json({ message: "This routes requires admin authentication" })
            return
        }
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string)
        if (!decoded) {
            res.statusCode = 401
            res.json({ message: "Unauthorized" })
            return
        }
        const verifyAdminUser = await AdminUser.isAdmin(decoded._id)
        if (!verifyAdminUser) {
            res.statusCode = 401
            res.json({ message: "Unauthorized" })
            return
        }
        next()
    }
    catch (error: any) {
        res.statusCode = 500
        res.json({ message: "There was an error", error: error.message })
    }
}
