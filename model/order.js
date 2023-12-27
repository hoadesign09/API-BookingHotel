import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Tham chiếu đến model User
      required: true,
    },
    amount: {
      type: Number,
    },
    orderDescription: {
      type: String,
    },
    orderType: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", OrderSchema);
