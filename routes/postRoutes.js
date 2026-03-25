import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { createPost, getAllPosts, deletePost, getMyPosts } from "../controllers/postController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware, // 🔥 MUST COME FIRST
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  createPost
);
router.get("/", getAllPosts);
router.get("/me", authMiddleware, getMyPosts);
router.delete("/:id", authMiddleware, deletePost);

export default router;
