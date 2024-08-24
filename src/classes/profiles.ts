import database from "../libs/db";
import type ReturnData from "../libs/types/returnData";

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

  new(): ReturnData {
    const newProfile = database.query(
      `INSERT INTO Profiles(name, photo, user_id) VALUES($name,$photo,$userId)`
    );
    try {
      const verifyUser = database
        .query(`SELECT id FROM User WHERE id = $userId`)
        .get({ $userId: this.userId });
      if (!verifyUser) {
        return { message: "User not found" };
      }
      newProfile.run({
        $name: this.name,
        $photo: this.photo,
        $userId: this.userId,
      });

      return { message: "success" };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating profile",
        error: error.message,
      };
    }
  }

  getAll(): ReturnData {
    const getAllProfiles = database.query(
      `SELECT * FROM Profiles WHERE user_id = $userId`
    );
    try {
      const verifyUser = database.query(`SELECT id FROM User WHERE id = $userId`).get({ $userId: this.userId });
      if (!verifyUser) {
        return { message: "User not found" };
      }
      const allProfiles = getAllProfiles.all({ $userId: this.userId });
      return { message: "success", profiles: allProfiles };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting all profiles",
        error: error.message,
      };
    }
  }
}
