import express from "express";
import {
  sendMessage,
  getMessages,
  getAllUsersInChat, // ✅ Import this controller
} from "../controllers/chatController.js";

const router = express.Router();

// ✅ Route to get all users who have chatted
router.get("/all-users", getAllUsersInChat);

// Route to send a message (POST)
router.post("/send", sendMessage);

// Route to get all messages with a specific user (GET)
router.get("/:senderId", getMessages); // Keep this **after** /all-users route

export default router;
