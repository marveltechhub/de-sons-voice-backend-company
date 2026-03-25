import express from 'express';
import { signup, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 🔐 Get current logged-in user
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
