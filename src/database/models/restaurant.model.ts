import { DbCollection } from "../../constants/db.collection.const";
import { Model, model } from "mongoose";
import restaurantSchema from "../schema/restaurant.schema";

// Restauant Collection
const restaurantCollection: Model<any> = model(
  DbCollection.restaurant,
  restaurantSchema
);

export default restaurantCollection;
