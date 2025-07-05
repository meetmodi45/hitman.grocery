import express from "express";
import authUser from "../middlewares/authUser.js";
import Order from "../models/orders.js";

const router = express.Router();

// @POST /api/orders
router.post("/", authUser, async (req, res) => {
  const { products, shippingAddress, paymentMethod } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products in order" });
  }

  try {
    const newOrder = await Order.create({
      user: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
