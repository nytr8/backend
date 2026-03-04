import jwt from "jsonwebtoken";
import redis from "../config/redisClient.js";

async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    return res.status(400).json({
      message: "token is invalid",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "not verified",
    });
  }
  req.user = decoded;
  next();
}

export { identifyUser };
