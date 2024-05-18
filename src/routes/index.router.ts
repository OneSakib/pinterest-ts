import express, { NextFunction, Request, Response, Router } from "express";

const indexRouter: Router = express.Router();

/* GET home page. */
indexRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction): void => {
    res.render("index", { title: "Express" });
  }
);

export default indexRouter;
