import { DbCollection } from "../../constants/db.collection.const";
import { Model, model } from "mongoose";
import userSchema from "../schema/user.schema";

// Use Schema to create a new model
const userCollection: Model<any> = model(DbCollection.user, userSchema);

export default userCollection;
