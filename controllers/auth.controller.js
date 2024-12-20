const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists! Please try again",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    res.status(200).json({
      success: true,
      token: token,
      message: "Login successful",
      user: {
        id: checkUser._id,
        email: checkUser.email,
        username: checkUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
