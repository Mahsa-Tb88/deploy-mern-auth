import mongoose from "mongoose";
import User from "../model/userSchema.js";
import bcryptjs from "bcryptjs";

export async function updateUser(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    return res.fail("Invalid user Id");
  }
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const username = req.body.username ?? user.username;
      const image = req.body.image ?? user.image;
      const password = req.body.password;
      let hashPassword = user.password;
      console.log(req.body.password);
      if (req.body.password) {
        const newPassword = await bcryptjs.hash(password, 10);
        hashPassword = newPassword;
      }
      const findedUsername = await User.findOne({
        username: req.body.username,
      });
      if (findedUsername && findedUsername._id.toString() != req.params.id) {
        res.fail("This username is already exists!");
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username,
          password: hashPassword,
          image,
        },
        { new: true }
      );
      updatedUser.password = undefined;
      res.success("Updated Successfully", updatedUser);
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}
export async function deleteUser(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    return res.fail("Invalid user Id");
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.fail("There is no user with this id", 404);
      return;
    }
    if (user._id.toString() != req.params.id) {
      res.fail("you dont have authorization!");
      return;
    }
    await User.findByIdAndDelete(req.params.id);
    res.success("Your account deleted successfully");
  } catch (e) {
    res.fail(e.message, 500);
  }
}
