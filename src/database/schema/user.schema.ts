import { Schema } from "mongoose";
const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  role:{
    type:String,
    enum:['admin','user'],
  },
  password: {
    type: String,
    required: true,
  },
  timestamp:{
    type:Date,
    required:true,
  }
});
export default userSchema;
