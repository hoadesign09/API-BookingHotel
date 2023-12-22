import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotifiSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("notification", NotifiSchema)