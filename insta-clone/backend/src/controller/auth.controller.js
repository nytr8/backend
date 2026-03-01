import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ===== REGISTER =====
async function registerController(req, res) {
  try {
    // Get user data from body
    const { userName, email, password, bio, profileImage } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    // Check user exists or not by email or username
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    // Check user exists or not
    if (isUserAlreadyExists) {
      return res.status(409).json({
        message:
          isUserAlreadyExists.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      userName,
      email,
      password: hash,
      bio: bio || "",
      profileImage: profileImage || "",
    });

    // Generate tokens
    const token = jwt.sign(
      { id: user._id, username: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Changed from 10s to 15 minutes
    );

    // Set cookies with security options
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

// ===== LOGIN =====
async function loginController(req, res) {
  try {
    const { email, userName, password } = req.body;

    // Validate required fields
    if ((!email && !userName) || !password) {
      return res.status(400).json({
        message: "Email/username and password are required",
      });
    }

    // Find user
    const user = await userModel
      .findOne({
        $or: [{ email: email }, { userName: userName }],
      })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // Generate tokens
    const token = jwt.sign(
      { id: user._id, username: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Changed from 5s to 15 minutes
    );

    // Set cookies
    res.cookie("token", token);
    res.status(200).json({
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

// ===== LOGOUT =====
async function logoutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out successfully",
  });
}
async function getMeController(req, res) {
  const userId = req.user.id;
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({
      message: "user does not exists",
    });
  }
  res.status(200).json({
    message: "user found",
    user,
  });
}

export {
  registerController,
  loginController,
  logoutController,
  getMeController,
};
