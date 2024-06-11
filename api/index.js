console.clear();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";
import miscRoutes from "./routes/miscRoutes.js";
import responseMiddleWare from "./middleWares/respondMiddleWares.js";
import { checkToken } from "./middleWares/authMiddleWare.js";
import corsMiddleware from "./middleWares/corsMiddleWare.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __dirname2 = path.resolve();
app.use(express.static(path.join(__dirname2, "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname2, "frontend", "dist", "index.html"))
);

app.use(express.json());
app.use(corsMiddleware);
app.use(responseMiddleWare);
app.use(cookieParser());
app.use(checkToken);
app.use(miscRoutes);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/user", userRouter);

try {
  await mongoose.connect(process.env.MONGODB);
  console.log("connected to database");

  app.listen(3000, () => {
    console.log("Server is running on http://localhost3000");
  });
} catch (e) {
  console.log(e.message);
}
