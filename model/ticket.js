import mongoose from "mongoose"
const { Schema } = mongoose;

const TicketSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['sent', 'received', 'processing', 'completed']
    },
    messages: [
        {
          sender: { type: String, required: true }, // 'client' or 'admin'
          message: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Tham chiếu đến model User
        required: true,
    },
},
    { timestamps: true }
)

export default mongoose.model("ticket", TicketSchema)