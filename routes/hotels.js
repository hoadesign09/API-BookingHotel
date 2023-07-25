import express from "express"
import hotel from "../model/hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotels, getIdHotel, updateHotel } from "../controller/hotel.js";
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

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)



export default router