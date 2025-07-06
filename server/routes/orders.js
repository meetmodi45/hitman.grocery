import express from "express";
import authUser from "../middlewares/authUser.js";
import Order from "../models/orders.js";
import { getMyOrders } from "../controllers/orderController.js";
import Product from "../models/Product.js";
const router = express.Router();

// @POST /api/orders
router.post("/", authUser, async (req, res) => {
  const { products, shippingAddress, paymentMethod } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products in order" });
  }

  try {
    let subtotal = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      subtotal += product.offerPrice * item.quantity;
    }

    const gst = Math.round(subtotal * 0.05); // 5% GST
    const totalAmount = subtotal + gst;

    const newOrder = await Order.create({
      user: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @GET /api/orders
router.get("/my", authUser, getMyOrders);

export default router;
