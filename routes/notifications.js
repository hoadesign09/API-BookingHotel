import express from "express"
import { createNotification, getNotifications} from './../controller/notification.js';
import {verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createNotification)
//GET
router.get("/", verifyAdmin, getNotifications)

export default router