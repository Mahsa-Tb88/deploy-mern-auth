import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { useAppContext } from "../Context/AppContext";
import OathGoogle from "../components/OathGoogle";

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [failMessage, setFailMessage] = useState(false);

  async function onSubmit(data) {
    setFailMessage(false);
    const result = await login(data);
    if (result.success) {
      const user = result.body.findedUser;
      // console.log("user is: ", user);
      const newUser = {
        id: user._id,
        email: user.email,
        username: user.username,
        isLoggedIn: true,
        image: user.image,
      };
      dispatch({
        type: "setUser",
        payload: newUser,
      });

      navigate("/profile");
    } else {
      setFailMessage(result.message);
    }
  }
  return (
    <div className="text-center mt-10 max-w-lg mx-auto">
      {failMessage && (
        <div className="my-10">
          <h3 className="bg-red-800 text-white py-3 px-2 rounded-md font-bold">
            {failMessage}
          </h3>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-10">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md  px-2 text-md py-3"
            placeholder="email"
            type="text"
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && (
            <p className="text-red-700 text-left">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5">
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md  px-2 text-md py-3"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please Enter your password",
            })}
          />
          {errors.password && (
            <p className="text-red-700 text-left">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col justify-between items-center">
          <button className="bg-emerald-600 mb-4 text-white w-full rounded-md py-3 text-lg font-semibold hover:bg-emerald-800">
            Sign In
          </button>
          <OathGoogle />
        </div>
      </form>
      <div className=" mt-2 flex justify-start items-center">
        <p className="text-slate-800 pr-2">Don't have an account?</p>
        <Link
          to="/register"
          className="text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white px-3 py-2 rounded-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
