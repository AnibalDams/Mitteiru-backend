import type { Request, Response } from "express";
import User from "../../classes/users";

export default async function deleteUser(req: Request, res: Response) {

    try {
        const { id } = req.params
        const deleteU = await User.deleteUser(id)
        switch (deleteU.message) {
            case "User deleted successfully":
                res.statusCode = 200
                res.json(deleteU)
                break
            case "An error has occurred while deleting the user":
                res.statusCode = 500
                res.json(deleteU)
                break
        }
    } catch (error: any) {
        res.statusCode = 500
        res.json({ message: "There was an error", error: error.message })
        return
    }
}