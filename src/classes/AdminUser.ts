import bcrypt from "bcrypt"
import dbClient from "../libs/dbClient";
import verifyFields from "../libs/fieldsVerifier";
import jwt from "jsonwebtoken"
import type ReturnData from "../libs/types/returnData";
import type { AdminUser as IAdminUser } from "./interfaces/AdminUser";
import { ObjectId } from "mongodb";

const AdminUserCollection = dbClient.collection<IAdminUser>("adminUser")


export default class AdminUser {

    _id: string;
    email: string;
    password: string;
    accepted: boolean;

    constructor(
        _id: string = "",
        email: string = "",
        password: string = "",
        accepted: boolean = false
    ) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.accepted = accepted;
    }

    async new(): Promise<ReturnData> {
        try {
            if (!verifyFields([this.email, this.password])) {
                return { message: "All fields are required" }
            }
            const verifyUser = await AdminUserCollection.findOne({ email: this.email })
            if (verifyUser) {
                return { message: "User already exists" }
            }
            const password = await bcrypt.hash(this.password, 10);

            await AdminUserCollection.insertOne({

                email: this.email,
                password: password,
                accepted: this.accepted

            })
            return { message: "success" }


        } catch (error: any) {

            return { message: "An error has occurred", error: error.message }
        }
    }

    static async acceptAdmin(id: string): Promise<ReturnData> {
        try {
            const verifyUser = await AdminUserCollection.findOne({ _id: id })
            if (!verifyUser) {
                return { message: "User not found" }
            }
            await AdminUserCollection.findOneAndUpdate({ _id: id }, { $set: { accepted: true } })
            return { message: "success" }
        }
        catch (error: any) {
            return { message: "An error has occurred", error: error.message }
        }
    }

    static async login(email: string, password: string): Promise<ReturnData> {
        try {
            const verifyUser = await AdminUserCollection.findOne({ email: email })
            if (!verifyUser) {
                return { message: "User not found" }
            }
            if (!verifyUser.accepted) {
                return { message: "User not accepted" }
            }

            const match = await bcrypt.compare(password, verifyUser.password);
            if (!match) {
                return { message: "Invalid password" }
            }
            const token = jwt.sign({ email: email, _id: verifyUser._id.toString(), accepted: verifyUser.accepted }, process.env.SECRET_KEY as string);

            return { message: "success", user: token }

        } catch (error: any) {
            return { message: "An error has occurred", error: error.message }

        }
    }
    static async isAdmin(id: string): Promise<boolean> {
        try {
            const verify = await AdminUserCollection.findOne({ _id: new ObjectId(id) })
            if (!verify) {
                return false
            }
            if (!verify.accepted) {
                return false
            }
            return true
        }
        catch (error: any) {
            console.error(error)
            return false
        }
    }

}

