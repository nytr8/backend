import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import blacklistModel from "../models/blacklist.model.js";

async function authController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email === email
          ? "email already exists"
          : "username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user created successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}
async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");
  if (!user) {
    return res.status(404).json({
      message: "invalid credentials",
    });
  }

  const isHashedPassword = await bcrypt.compare(password, user.password);
  if (!isHashedPassword) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}
async function logoutController(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");
  await blacklistModel.create({ token });
  res.status(200).json({
    message: "user logged out successfully",
  });
}

export { authController, loginController, getMe, logoutController };
