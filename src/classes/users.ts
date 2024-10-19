import database from "../libs/db";
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
      const username =
        await database.sql`SELECT username FROM User WHERE username = ${this.username}`;
      if (username[0]) {
        return { message: "Username already used" };
      }
      const email =
        await database.sql`SELECT email FROM User WHERE email = ${this.email}`;
      if (email[0]) {
        return { message: "email already used" };
      }
      await database.sql`INSERT INTO User (username, email, password) VALUES(${this.username},${this.email},${this.password})`;

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
      const user = await database.sql
      `SELECT * FROM User WHERE email=${this.email} AND password=${this.password}`
    ;
      if (!user[0]) {
        return { message: "Invalid Email/Password" };
      }
      return { message: "success", user: user[0] };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the user",
        error: error.message,
      };
    }
  }
}
