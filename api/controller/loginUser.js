import User from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.fail("Please enter username or password");
    return;
  }
  try {
    let token;
    const findedUser = await User.findOne({ email });
    if (findedUser) {
      const match = await bcryptjs.compare(password, findedUser.password);
      if (match) {
        token = jwt.sign({ email }, process.env.SECRET_KEY);
        findedUser.password = undefined;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000 * 24,
          sameSite: "None",
          secure: false,
        });
        res.success("You logged in succesfully!", { findedUser });
      } else {
        res.fail("Email or password is not correct", 404);
      }
    } else {
      res.fail("Email or password is not correct", 404);
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}
