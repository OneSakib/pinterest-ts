import { Request } from "express";
export const enum DbCollection {
  user = "users",
  restaurant = "restaurants",
}
export interface userInterface {
  email: string;
  password: string;
  role: string;
  timestamp: Date;
}

export interface UserRequest extends Request {
  user?: any;
}
