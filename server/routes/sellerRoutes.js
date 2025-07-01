import express from "express";
import { loginSeller } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/login", loginSeller);
router.get("/protectedSellerRoute", authSeller, (req, res) => {
  res.status(200).json(req.user);
});
export default router;
