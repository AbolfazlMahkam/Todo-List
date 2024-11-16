const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // فرض بر اینکه مدل کاربر وجود دارد

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // Create JWT
    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "1d",
    });

    // Send token
    res
      .cookie("authToken", token, { httpOnly: true })
      .send("Logged in successfully");
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});