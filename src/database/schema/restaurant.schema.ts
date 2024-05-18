import { Schema } from "mongoose";
const restaurantSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  price: {
    required: true,
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
  },
});
export default restaurantSchema;
