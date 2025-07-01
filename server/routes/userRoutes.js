import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authUser, logoutUser);

router.get("/protectedUserroute", authUser, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
