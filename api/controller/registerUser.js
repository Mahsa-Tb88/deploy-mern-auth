import User from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
export async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
    res.fail("Please enter all fields!", 404);
  }
  try {
    const findemail = await User.findOne({ email });
    const findUsername = await User.findOne({ username });
    if (findUsername || findemail) {
      res.fail("These username or email is already exist.", 404);
      return;
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    newUser.password = undefined;
    res.success("new user registered successfully!", newUser);
  } catch (e) {
    res.fail(e.message, 500);
  }
}
