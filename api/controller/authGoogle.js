import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function authGoogle(req, res) {
  const { email, username, image } = req.body;

  const token = jwt.sign({ email }, process.env.SECRET_KEY);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000 * 24,
    sameSite: "None",
    secure: false,
  });
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.password = undefined;
      res.success("You logged in successfully!", user);
    } else {
      const password =
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2);
      const hashPassword = await bcryptjs.hash(password, 10);
      const username =
        req.body.username.split(" ").join("") +
        Math.floor(Math.random() * 100).toString();
      const newUser = await User.create({
        username,
        password: hashPassword,
        email,
        image,
      });
      newUser.password = undefined;
      res.success("New User created successfully!", newUser);
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}
