import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

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
  const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const hashedPassword = await bcrypt.hash(password, 10);

  res.cookie("token", token);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
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
  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!isUserExists) {
    return res.status(404).json({
      message: "user doesnt exists",
    });
  }
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  const isHashedPassword = await bcrypt.compare(
    password,
    isUserExists.password,
  );
  if (!isHashedPassword) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }
  res.cookie("token", token);
  res.status(200).json({
    message: "user logged in successfully",
    user: {
      username: isUserExists.username,
      email: isUserExists.email,
    },
  });
}

export { authController, loginController };
