import dbClient from "../libs/dbClient";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type ReturnData from "../libs/types/returnData";


export default class User {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async create(): Promise<ReturnData> {
    try {
      const password = await bcrypt.hash(this.password, 10);
      const username = await dbClient.collection("user").findOne({ username: this.username });
      if (username != null) {
        return { message: "Username already used" };
      }
      const email =
        await dbClient.collection("user").findOne({email:this.email});
      if (email != null) {
        return { message: "email already used" };
      }
      await dbClient.collection("user").insertOne({
        username: this.username,
        email: this.email,
        password: password,
      })
      

      return { message: "User created successfully" };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating the user",
        error: error.message,
      };
    }
  }

  async login():Promise< ReturnData> {

    try {
      const user = await dbClient.collection("user").findOne({email:this.email});
    ;
      if (user == null) {
        return { message: "Invalid Email" };
      } 
      const match = await bcrypt.compare(this.password, user.password);
      if(match){
            const token = jwt.sign({email:this.email, username:this.username, _id:user._id.toString()},process.env.SECRET_KEY as string);
        return { message: "success", user: token };

      }
      return { message: "Invalid Password" };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the user",
        error: error.message,
      };
    }
  }
  decodeToken(token:string):ReturnData{
    try {
      const tokenInfo = jwt.verify(token, process.env.SECRET_KEY as string);
      return {message:"Success", user:tokenInfo}
    } catch (error:any) {
      return {message :"There was an error decoding the token", error:error.message}
    }
  }
}
