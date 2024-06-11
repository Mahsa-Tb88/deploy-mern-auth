import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api.js";
import OathGoogle from "../components/OathGoogle.jsx";

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const clearSwitch = useRef(null);

  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function onSubmit(data) {
    const { email, username, password } = data;
    setSuccessMessage(false);
    setError(false);
    const result = await registerUser({ email, username, password });
    if (result.success) {
      setSuccessMessage("Your account created Successfully");
      clearSwitch.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(result.message);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className="text-center mt-10 max-w-lg mx-auto">
      {successMessage && (
        <div className="my-10">
          <h3 className="bg-emerald-700 text-white py-3 px-2 rounded-md font-bold text-lg">
            {successMessage}
          </h3>
        </div>
      )}
      {error && (
        <div className="my-10">
          <h3 className="bg-red-800 text-white py-3 px-2 rounded-md font-bold">
            {error}
          </h3>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md  px-2 text-md py-3"
            placeholder="username"
            type="text"
            {...register("username", {
              required: "Please enter your username",
            })}
          />
          {errors.username && (
            <p className="text-left text-red-800 font-semibold">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md  px-2 text-md py-3"
            placeholder="email"
            type="text"
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && (
            <p className="text-left text-red-800 font-semibold">
              {errors.email.message}
            </p>
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
            <p className="text-left text-red-800 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between items-center">
          {isSubmitting ? (
            <button
              className="bg-emerald-600 mb-4 text-white w-full rounded-md py-3 text-lg font-semibold opacity-50"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-3  text-white"
                viewBox="0 0 24 24"
              ></svg>
            </button>
          ) : (
            <button className="bg-emerald-600 mb-4 text-white w-full rounded-md py-3 text-lg font-semibold hover:bg-emerald-800">
              Sing Up
            </button>
          )}
          <OathGoogle />
        </div>
      </form>
      <div className=" mt-2 flex justify-start items-center">
        <p className="text-slate-800 pr-2"> have an account?</p>
        <Link
          to="/login"
          className="text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white px-3 py-2 rounded-md"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
