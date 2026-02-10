const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.google = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "No Google token provided" });
    }
    console.log("Token starts with:", token?.slice(0, 15));


    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email } = payload;
    const name = email.split("@")[0];


    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        googleId: sub,
        provider: "google",
        role: "user", 
      });
    }

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      user,
      needsRole: !user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed",err });
  }
};
