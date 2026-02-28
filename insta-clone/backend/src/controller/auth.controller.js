import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

async function registerController(req, res) {
  //get user data from body
  const { userName, email, password, bio, profileImage } = req.body;

  //check user exists or not by email or username
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  //check user exists or not
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        isUserAlreadyExists.email == email
          ? "email already exists"
          : "username already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    userName,
    email,
    password: hash,
    bio,
    profileImage,
  });
  const token = jwt.sign(
    { id: user._id, username: user.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user registered succesfully",
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      token: token,
    },
  });
}
async function loginController(req, res) {
  const { email, userName, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [
        {
          email: email,
        },
        {
          userName: userName,
        },
      ],
    })
    .select("+password");
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = user.password === hash;
  if (!isPasswordValid) {
    res.status(401).json({
      message: "incorrect password",
    });
  }
  const token = jwt.sign(
    { id: user._id, username: user.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "logged in succesfully",
    user: {
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function logoutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
}

export { registerController, loginController, logoutController };
