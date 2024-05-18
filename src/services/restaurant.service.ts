import { Response, NextFunction } from "express";
import { createRestaurantValidation } from "../JoiValidation/restaurant.validation";
import { RequestWithUser } from "../constants/interface.const";
import restaurantCollection from "../database/models/restaurant.model";

export const getAllRestaurantsService = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const restaurants = await restaurantCollection.find({
    owner: req.user._id,
  });
  return res.json(restaurants);
};
export const getRestaurantByIdService = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  return res.json({ res: "get restaurant by id service called" });
};
export const createRestaurantService = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = createRestaurantValidation.validate(req.body, {});
    if (error) {
      console.log("error", error);
      return res.status(400).json(error.details.map((err: any) => err.message));
    }
    const restaurant = await restaurantCollection.create({
      ...req.body,
      owner: req.user._id,
    });
    return res.json(restaurant);
  } catch (error: any) {
    return res.status(400).send(error.message || "Internal Server Error");
  }
};
export const updateRestaurantService = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  return res.json({ res: "update restaurant service called" });
};
export const deleteRestaurantService = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  return res.json({ res: "delete restaurant service called" });
};
