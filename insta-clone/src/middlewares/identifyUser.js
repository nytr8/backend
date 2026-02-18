import jwt from "jsonwebtoken";
function authenticateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "unauthorized access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "invalid token",
    });
  }
  req.user = decoded;
  next();
}
export default authenticateUser;
