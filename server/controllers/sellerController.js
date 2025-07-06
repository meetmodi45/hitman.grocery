import jwt from "jsonwebtoken";

// SELLER LOGIN
export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  if (
    email === process.env.SELLER_EMAIL &&
    password === process.env.SELLER_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Seller logged in successfully" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

// SELLER LOGOUT
export const logoutSeller = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// CHECK SELLER AUTH
export const checkSellerAuth = (req, res) => {
  res.status(200).json({ success: true });
};
