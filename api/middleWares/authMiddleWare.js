import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
export async function checkToken(req, res, next) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        const user = await User.findOne({ email: decode.email });
        req.username = user.username;
        req.email = user.email;
        req.userId = user._id.toString();
      }
      return next();
    } catch (e) {
      return next();
    }
  }
  next();
}
export async function isLoggedIn(req, res, next) {
  if (req.username) {
    console.log("req.username", req.username);
    next();
  } else {
    res.fail("Please log in first!", 402);
  }
}
