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

  create(): ReturnData {
    const createUser = database.query(
      `INSERT INTO User (username, email, password) VALUES($username,$email,$password)`
    );
    const verifyUsername = database.query(
      `SELECT username FROM User WHERE username = $username`
    );
    const verifyEmail = database.query(
      `SELECT email FROM User WHERE email = $email`
    );
    try {
      const username = verifyUsername.get({ $username: this.username });

      if (username) {
        return { message: "Username already used" };
      }
      const email = verifyEmail.get({ $email: this.email });
      if (email) {
        return { message: "email already used" };
      }
      createUser.run({
        $username: this.username,
        $email: this.email,
        $password: this.password,
      });
      return { message: "User created successfully" };
    } catch (error: any) {
      return {
        message: "An error has occurred while creating the user",
        error: error.message,
      };
    }
  }

  login(): ReturnData {
    const login = database.query(
      `SELECT * FROM User WHERE email=$email AND password=$password`
    );

    try {
      const user = login.get({ $email: this.email, $password: this.password });
      if (!user) {
        return { message: "Invalid Email/Password" };
      }
      return { message: "success", user: user };
    } catch (error: any) {
      return {
        message: "An error has occurred while getting the user",
        error: error.message,
      };
    }
  }
}
