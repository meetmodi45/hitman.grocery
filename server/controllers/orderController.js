import Order from "../models/orders.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};
