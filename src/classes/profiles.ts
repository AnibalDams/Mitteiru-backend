import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";
import List from "./lists";
export default class Profile {
  id: number;
  name: string;
  photo: string;
  userId: number;

  constructor(
    id: number = 0,
    name: string = "",
    photo: string = "",
    userId: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.userId = userId;
  }

  async new():Promise< ReturnData> {
    const defaultLists = ["Watching", "Completed", "Planning", "Paused", "Dropped"]
    try {
      const verifyUser = await database
        .sql`SELECT id FROM User WHERE id = ${this.userId}`
      if (!verifyUser[0]) {
        return { message: "User not found" };
      }
      await database.sql
      `INSERT INTO Profiles(name, photo, user_id) VALUES(${this.name},${this.photo},${this.userId})`
    ;
      const profile:any = await database.get(`SELECT last_insert_rowid() as id`);
      for (let i = 0; i < defaultLists.length; i++) {
        const listName = defaultLists[i];
        const list = new List(0,listName,profile.id)
        list.new()        
      }

      return { message: "success" };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating profile",
        error: error.message,
      };
    }
  }

  async getAll():Promise< ReturnData> {

    try {
      const verifyUser =await database.sql`SELECT id FROM User WHERE id = ${this.userId}`
      if (!verifyUser[0]) {
        return { message: "User not found" };
      }
      const allProfiles = await database.sql
      `SELECT * FROM Profiles WHERE user_id = ${this.userId}`
    ;
      return { message: "success", profiles: allProfiles };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting all profiles",
        error: error.message,
      };
    }
  }

  async delete():Promise<ReturnData>{
    try {
      await database.sql`DELETE FROM Profiles WHERE id=${this.id}`
      return {message: "success"}
    } catch (error:any) {
      return {message: "An error has occurred while deleting the profile", error: error.message}
    }
  }

  async update():Promise<ReturnData>{
    try {
      database.sql`UPDATE Profiles SET name=${this.name},photo=${this.photo} WHERE id=${this.id}`
      return {message:"success"}
    } catch (error:any) {
      return {message: "An error has occurred while updating the profile", error: error.message}
    }
  }
}
