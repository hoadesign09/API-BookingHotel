import express from "express"
import hotel from "../model/hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotels, getIdHotel, updateHotel, getHotelsByUserCity, getHotelRooms } from "../controller/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createHotel)
//UPDATE
router.put("/:id", verifyAdmin, updateHotel)
//GET BY ID
router.get("/find/:id", getIdHotel)
//GET ALL
router.get("/", getHotels)
//COUNBYCITY
router.get("/countbycity", countByCity)
//COUNTBYTYPE
router.get("/countbytype", countByType)
router.get("/room/:id", getHotelRooms)

//DELETE
router.delete("/find/:id", verifyAdmin, deleteHotel)
//SUGGEST
router.get("/chooseforyou", getHotelsByUserCity)


export default router