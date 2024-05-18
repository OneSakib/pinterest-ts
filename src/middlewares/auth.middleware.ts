import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "../constants/interface.const";

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    token = token.replace("Bearer ", "");
    // Verify Token
    const payload = jwt.verify(token, process.env.APP_SECRET || "secret");
    req.user = payload;
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
