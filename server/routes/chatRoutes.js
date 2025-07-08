import express from "express";
import {
  sendMessage,
  getMessages,
  getAllUsersInChat,
  getUnreadStatus, // We'll add this new controller
} from "../controllers/chatController.js";
import Message from "../models/Message.js";

const router = express.Router();

// GET /api/chat/all-users
router.get("/all-users", getAllUsersInChat);

// GET /api/chat/unread-status (must come before :senderId)
router.get("/unread-status", getUnreadStatus);

// POST /api/chat/send
router.post("/send", sendMessage);

// GET /api/chat/:senderId
router.get("/:senderId", getMessages);

// POST /api/chat/mark-read/:userId
router.post("/mark-read/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await Message.updateMany(
      { senderId: userId, fromSeller: false, isUnreadForSeller: true },
      { $set: { isUnreadForSeller: false } }
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
