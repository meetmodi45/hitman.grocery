import express from "express";
import {
  sendMessage,
  getMessages,
  getAllUsersInChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/all-users", getAllUsersInChat);

// Route to send a message (POST)
router.post("/send", sendMessage);

// Route to get all messages with a specific user (GET)
router.get("/:senderId", getMessages);

export default router;
