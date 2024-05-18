import express, { NextFunction, Request, Response, Router } from "express";
import {
  createRestaurantService,
  deleteRestaurantService,
  getAllRestaurantsService,
  getRestaurantByIdService,
  updateRestaurantService,
} from "../services/restaurant.service";
import { authMiddleware } from "../middlewares/auth.middleware";
const restaurantRouter: Router = express.Router();

/* GET Restaurant listing. */
restaurantRouter.get(
  "/",authMiddleware,
  getAllRestaurantsService
);

/* GET By Id Restaurant listing. */
restaurantRouter.get(
  "/:id",authMiddleware,
  getRestaurantByIdService
);
/* GET Restaurant listing. */
restaurantRouter.post(
  "/",authMiddleware,
  createRestaurantService
);
/* GET Restaurant listing. */
restaurantRouter.put(
  "/:id",authMiddleware,
  updateRestaurantService
);
/* GET Restaurant listing. */
restaurantRouter.delete(
  "/:id",authMiddleware,
  deleteRestaurantService
);

export default restaurantRouter;
