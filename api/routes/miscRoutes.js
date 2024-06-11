import express from "express";
import { initialize } from "../controller/initialize.js";
import { isLoggedIn } from "../middleWares/authMiddleWare.js";
import uploadsMiddleWare from "../middleWares/uploadsMiddleWare.js";
import { uploadFile } from "../controller/uploadController.js";

const router = express.Router();

router.get("/misc/initialize", initialize);

router.post("/uploads", isLoggedIn, uploadsMiddleWare, uploadFile);
router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.fail("Max Size of file");
  } else if (err.code === "INVALID_EXTENSION") {
    res.fail("Invalid Extension");
  }
});

export default router;
