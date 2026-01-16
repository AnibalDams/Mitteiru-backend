import type { Request, Response } from "express";
import verifyFields from "../../libs/fieldsVerifier";
import User from "../../classes/users";


export default async function getAllUsers(req: Request, res: Response) {

    try {
        const { page, limit } = req.query
        if (!verifyFields([page, limit])) {
            res.statusCode = 400
            res.json({ message: "Query and limit required" })
            return
        }
        const allUsers = await User.getAll(Number(page), Number(limit))

        switch (allUsers.message) {
            case "Success":
                res.statusCode = 200
                res.json(allUsers)
                break
            case "An error has occurred while getting the users":
                res.statusCode = 500
                res.json(allUsers)
                break
        }

    } catch (error: any) {
        res.statusCode = 500
        res.json({ message: "There was an error", error: error.message })
        return
    }

}

