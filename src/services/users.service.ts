import { Request, Response, NextFunction } from "express";
import userCollection from "../database/models/user.model";
import {
  userLoginValidation,
  userSignupValidation,
} from "../JoiValidation/user.validation";
import * as bcrypt from "bcrypt";
import { userInterface } from "../constants/db.collection.const";
import * as jwt from "jsonwebtoken";

const loginService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = userLoginValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json(error.details.map((err) => err.message));
    }
    // Check User exist or not
    const userExist = await userCollection.findOne({
      email: value.email,
      role: value.role,
    });
    if (!userExist) {
      return res.send({ res: "Invalid Credentials" });
    }
    // // Create User
    const passwordMatch = await bcrypt.compare(
      value.password,
      userExist.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        _id: userExist._id,
        role: userExist.role,
        name: userExist.name,
        email: userExist.email,
      },
      process.env.APP_SECRET || "secret",
      {
        expiresIn: "3 days",
      }
    );
    const result = {
      id: userExist._id,
      role: userExist.role,
      name: userExist.name,
      email: userExist.email,
      token: token,
      expiresIn: "3 days",
    };
    return res.status(200).json({
      ...result,
      message: "You are logged in successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const signUpService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = userSignupValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json(error.details.map((err) => err.message));
    }
    // Check User exist or not
    const exist = await userCollection.findOne({ email: value.email });
    if (exist) {
      return res.send({ res: "User Already exist" });
    }
    // // Create User
    const password = await bcrypt.hash(value.password, 12);
    const ts = new Date();
    const payload: userInterface = {
      ...value,
      password,
      timestamp: ts,
    };
    const user = new userCollection(payload);
    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.APP_SECRET || "secret",
      {
        expiresIn: "3 days",
      }
    );
    const result = {
      role: user.role,
      name: user.name,
      email: user.email,
      token: token,
      expiresIn: "3 days",
    };
    return res.status(200).json({
      ...result,
      message: "You are signup successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { loginService, signUpService };
