import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// ✅ CORS for multiple frontend origins + credentials
app.use(
  cors({
    origin: [
      "http://http://localhost:5173/",
      "https://de-sons-voice.vercel.app",
    ],
    credentials: true, // allows sending cookies
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
