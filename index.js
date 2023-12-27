import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import notificationRoute from "./routes/notifications.js"
import ticketRoute from "./routes/tickets.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()

let userActivityLogs = [];


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb.")
    } catch (error) {
        throw error;
    } 
};

app.use(cors({
    origin: true,
    exposedHeaders: ['Authorization'], 
  }));

//middlewares
app.use(cookieParser())
app.use(express.json())
  
app.use( (req, res, next) => {
    const logData = {
      timestamp: new Date().toISOString(),
      userId: req.id, 
      endpoint: req.path,
      method: req.method,
    };
    userActivityLogs.push(logData);
    next();
});



app.get("/api/logs", (req, res) => {
    res.json(userActivityLogs);
  });
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/notifications", notificationRoute)
app.use("/api/tickets", ticketRoute)

app.use((err, req, res, next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })
})


app.listen(8008, () => {
    connect()
    console.log("Connected to nodejs.")
})