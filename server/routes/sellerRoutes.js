import express from "express";
import { loginSeller, logoutSeller } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/login", loginSeller);
router.get("/logout", logoutSeller);
router.get("/check-auth", authSeller, (req, res) => {
  res.status(200).json({ success: true });
});
export default router;
