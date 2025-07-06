import express from "express";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.get("/profile", authUser, (req, res) => {
  res.json(req.user);
});

export default router;
