import mongoose from "mongoose"
const { Schema } = mongoose;

const RoomSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    maxPeople: {
        type: Number,
        require: true,
    },
    desc: {
        type: String,
        require: true
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]} }],
},
    { timestamps: true }
)

export default mongoose.model("room", RoomSchema)