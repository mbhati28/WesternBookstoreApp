const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "589361707877-g76lohmtelhsp97qpo37dfc81ho3u21c.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Check if user exists in your database
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({
        username: payload.name,
        email: payload.email,
        password: CryptoJS.AES.encrypt(
          "your-random-password",
          "qwerty"
        ).toString(),
        // You can set other fields based on your requirements
      });
      await user.save();
    }

    // Generate JWT token or any other method you use for user sessions
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "qwerty",
      { expiresIn: "3d" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error });
  }
});

// REGISTER;
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, "qwerty").toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  console.log("Hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      console.log("wrong user")
      return res.status(401).json("Wrong User Name");
    }
    if (!user.isActive) {
      return res.status(403).json("User is inactive");
    }

    console.log("Hello " + user.username);

    const hashedPassword = CryptoJS.AES.decrypt(user.password, "qwerty");

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong Password"); // Use return here
    }

    // originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "qwerty",
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
