import express from "express";

import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../controllers/productController.js";

import authSeller from "../middlewares/authSeller.js";

const router = express.Router();

// Add a product (Only Seller)
router.post("/add", authSeller, createProduct);

// Get all products (Public)
router.get("/", getAllProducts);

// Delete a product (Only Seller)
router.delete("/:id", authSeller, deleteProduct);

export default router;
