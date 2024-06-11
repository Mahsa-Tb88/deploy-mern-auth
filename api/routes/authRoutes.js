import express from "express";
import { registerUser } from "../controller/registerUser.js";
import { loginUser } from "../controller/loginUser.js";
import { signOutUser } from "../controller/singOutUser.js";
import { authGoogle } from "../controller/authGoogle.js";

const router = express.Router();
console.log("auth route.........");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", authGoogle);
router.get("/signout", signOutUser);

export default router;
