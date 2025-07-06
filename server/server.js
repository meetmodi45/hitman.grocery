import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import OrderRoutes from "./routes/orders.js";
import authRoutes from "./routes/userAuth.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Test route
app.get("/", (req, res) => res.send("API is working"));

// Route for users
app.use("/api/users", userRoutes);

// Route for seller
app.use("/api/seller", sellerRoutes);
// Start server after DB is connected

// Route for products
app.use("/api/products", productRoutes);

// Route for orders
app.use("/api/orders", OrderRoutes);

// Route for authentication
app.use("/api/userAuth", authRoutes);

// Route for payment
app.use("/api/payment", paymentRoutes);
const startServer = async () => {
  await connectDB();

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
};

startServer();
