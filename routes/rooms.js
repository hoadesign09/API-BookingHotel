import express from "express"
import { createRoom, updateRoom, getIdRoom, getRooms, deleteRoom, updateRoomAvailability } from "../controller/room.js"
import {verifyAdmin} from "../utils/verifyToken.js"


const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom)
//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
//GET BY ID
router.get("/:id", getIdRoom)
//GET ALL
router.get("/", getRooms)
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)


export default router