import express from "express";
import upload from "../middlewares/multer.js"; // uses memoryStorage
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/Product.js";

import { loginSeller, logoutSeller } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/login", loginSeller);
router.get("/logout", logoutSeller);
router.get("/check-auth", authSeller, (req, res) => {
  res.status(200).json({ success: true });
});
router.post("/add-product", upload.array("images", 4), async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;
    const imageFiles = req.files;

    // Add validation for files
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload at least one image" });
    }

    const uploadPromises = imageFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            })
            .end(file.buffer);
        })
    );

    const imageUrls = await Promise.all(uploadPromises);

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      image: imageUrls,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
