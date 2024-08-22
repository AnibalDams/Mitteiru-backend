import User from "../../classes/users";
import type { Response, Request } from "express";

export default function signUp(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = new User("", email, password);
    const getUser = user.login();

    switch (getUser.message) {
      case "Invalid Email/Password":
        res.statusCode = 200;
        res.json(getUser);
        break;
      case "success":
        res.statusCode = 201;
        res.json(getUser);
        break;
      case "An error has occurred while getting the user":
        res.statusCode = 500;
        res.json(getUser);
        break;
    }
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ error: error.message, message: "There was an error" });
  }
}
