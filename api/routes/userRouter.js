import express from "express";
import { isLoggedIn } from "../middleWares/authMiddleWare.js";
import { updateUser,deleteUser } from "../controller/userController.js";
const router = express.Router();

router.put("/:id", isLoggedIn, updateUser);
router.delete("/:id", isLoggedIn, deleteUser);
export default router;
