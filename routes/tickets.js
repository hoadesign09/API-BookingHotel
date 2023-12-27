import express from "express";
import {
  createTicket,
  getAllTickets,
  updateTicketStatus,
  deleteTicket,
  replyToTicket,
  getAllTicketsAdmin,
} from "../controller/ticket.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyUser, createTicket);
router.get("/all", verifyUser, getAllTickets);
router.delete("/:id", verifyUser, deleteTicket);
router.put("/:id/status", verifyUser, updateTicketStatus);
router.post("/:id/reply", verifyUser, replyToTicket);
router.get("/", verifyAdmin, getAllTicketsAdmin)
export default router;
