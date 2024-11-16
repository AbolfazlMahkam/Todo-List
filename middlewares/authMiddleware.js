const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken; // گرفتن توکن از کوکی
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "your_secret_key");
    req.user = verified; // ذخیره اطلاعات کاربر در درخواست
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authMiddleware;