const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        message: "Username already exists",
        suggestion: "Please choose a different username",
      });
    }

    const user = await User.create({ username, password});
    
    const token = jwt.sign(
      { userId: user._id, role:"user" },
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );
    
    res.status(201).json({ token, 
      user: {
        id: user._id,
        username,
         role:"user"
      },
      message: "Registration successful",
       });
  } catch (error) {
    res.status(400).json({ message: error.message });
    // next(error)
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "no user",
        suggestions: [
          "Check if username is spelled correctly",
          "Make sure you have registered first",
        ],
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password mismatch",
        suggestions: [
          "Check if password is correct",
          "Reset your password if you've forgotten it",
        ],
      });
    }

    const token = jwt.sign(
      { userId: user._id, role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      details: error.message,
      suggestions: [
        "Try again in a few minutes",
        "Contact support if the problem persists",
      ],
    });
  }
};












