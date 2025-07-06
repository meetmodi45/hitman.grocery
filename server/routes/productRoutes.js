import express from "express";

import {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  getBestSellers,
} from "../controllers/productController.js";

import authSeller from "../middlewares/authSeller.js";

const router = express.Router();

// Add a product (Only Seller)
router.post("/add", authSeller, createProduct);

// Get all products (Public)
router.get("/", getAllProducts);

// Get best sellers (Public)
router.get("/bestsellers", getBestSellers);

// Delete a product (Only Seller)
router.delete("/:id", authSeller, deleteProduct);

// Get a single product (Public)
router.get("/:id", getProductById);

export default router;
