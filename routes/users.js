import express from "express"
import { updateUser, deleteUser, getIdUser, getUsers } from "../controller/user.js";
import { verifyToke, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToke, (req, res, next)=> {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=> {
//     res.send("hello user, you are logged in and you can detele your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=> {
//     res.send("hello admin, you are logged in and you can detele all account")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser)
//GET BY ID
router.get("/:id", verifyUser, getIdUser)
//GET ALL
router.get("/", verifyAdmin, getUsers)
//DELETE
router.delete("/:id", verifyUser, deleteUser)

export default router