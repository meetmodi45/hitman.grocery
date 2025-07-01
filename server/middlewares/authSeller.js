import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      req.user = tokenDecode;
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Access Denied: Not Seller" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token", error: error.message });
  }
};

export default authSeller;
