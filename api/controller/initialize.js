import User from "../model/userSchema.js";

export async function initialize(req, res) {
  let user = {};
  try {
    if (req.email) {
      user = await User.findOne({ email: req.email });
      user.password = undefined;
    }
    res.success("Initialized successfully", user);
  } catch (e) {
    res.fail(e.message, 500);
  }
}
