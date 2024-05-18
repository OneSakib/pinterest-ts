import express, { NextFunction, Request, Response, Router } from "express";
import { loginService, signUpService } from "../services/users.service";
var userRouter: Router = express.Router();
/* GET users listing. */

userRouter.post(
  "/signup",
  signUpService
);
userRouter.post(
  "/login",loginService  
);
export default userRouter;
