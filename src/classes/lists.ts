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

  new(): ReturnData {
    const newList = database.query(
      `INSERT INTO Lists (name, profile_id) VALUES($name, $profileId)`
    );
    const verifyProfile = database.query(
      `SELECT id FROM Profiles WHERE id=$profileId`
    );
    try {
      const profile = verifyProfile.get({ $profileId: this.profileId });
      if (!profile) {
        return { message: "profile not found" };
      }
      newList.run({ $name: this.name, $profileId: this.profileId });
      return { message: "Success" };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }

  getAll(): ReturnData {
    const getAll = database.query(
      `SELECT * FROM Lists WHERE profile_id=$profileId`
    );
    try {
      const verifyProfile = database
        .query(`SELECT id FROM Profiles WHERE id=$profileId`)
        .get({ $profileId: this.profileId });
        if(!verifyProfile){
            return {message: "Profile not found"}
        }
      const all = getAll.all({ $profileId: this.profileId });
      return { message: "Success", lists: all };
    } catch (error: any) {
      return { message: "An error occurred", error: error.message };
    }
  }
}
