import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";

export default class List {
  id: number;
  name: string;
  profileId: number;

  constructor(id: number, name: string, profileId: number) {
    this.id = id;
    this.name = name;
    this.profileId = profileId;
  }

  async new(): Promise<ReturnData> {
    try {
      const verifyProfile =
        await database.sql`SELECT id FROM Profiles WHERE id=${this.profileId}`;
        console.log(this.profileId)
      if (!verifyProfile[0]) {
        return { message: "profile not found" };
      }
      await database.sql`INSERT INTO Lists (name, profile_id) VALUES(${this.name}, ${this.profileId})`;
      return { message: "Success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

  async getAll(): Promise<ReturnData> {
    try {
      const verifyProfile = await database.sql`SELECT id FROM Profiles WHERE id=${this.profileId}`;
      if (!verifyProfile[0]) {
        return { message: "Profile not found" };
      }
      const all = await database.sql`SELECT * FROM Lists WHERE profile_id=${this.profileId}`;
      return { message: "Success", lists: all };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
}
