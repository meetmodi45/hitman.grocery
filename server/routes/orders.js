import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  createOrder,
  getMyOrders,
  getAllOrdersForSeller,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authUser, createOrder);
router.get("/my", authUser, getMyOrders);
router.get("/all", getAllOrdersForSeller);

export default router;
