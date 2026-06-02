import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const verfiyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verfiyToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = verfiyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
