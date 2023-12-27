import express from "express"
import { createNotification, deleteNoti, getNotifications} from './../controller/notification.js';
import {verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createNotification)
//GET
router.get("/", verifyAdmin, getNotifications)
router.delete("/:id", verifyAdmin, deleteNoti)
export default router