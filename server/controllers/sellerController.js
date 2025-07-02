import jwt from "jsonwebtoken";

export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  if (
    email === process.env.SELLER_EMAIL &&
    password === process.env.SELLER_PASSWORD
  ) {
    // Generate token with email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set sellerToken in cookies
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

export const logoutSeller = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
