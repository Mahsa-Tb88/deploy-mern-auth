import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { deleteUser, signOut, updateUser, uploadFile } from "../utils/api";
import { RxCross2 } from "react-icons/rx";

export default function Profile() {
  const { state, dispatch } = useAppContext();
  const [successMessage, setSuccessMessage] = useState(false);
  const noImage = SERVER_URL + "/uploads/user1718051367920.png";
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [failMessage, setFailMessage] = useState(false);
  // const fileRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      username: state.user.username,
      email: state.user.email,
      image: state.user?.image ? state.user.image : noImage,
    },
  });
  useEffect(() => {
    if (!state.user.id) {
      navigate("/login");
      return;
    }
    if (state.user?.image) {
      if (state.user.image.includes("uploads")) {
        setSelectedImage(SERVER_URL + state.user.image);
      } else {
        setSelectedImage(state.user.image);
      }
    } else {
      setSelectedImage(noImage);
    }
  }, []);
  const imageField = { ...register("image") };

  async function handleImageSelect(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setImageChanged(true);
      const result = await uploadFile(file);

      if (result.success) {
        setSelectedImage(SERVER_URL + result.body.url);
      } else {
        setFailMessage(result.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }

  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("image", "");
  }

  async function onSubmit(data) {
    setSuccessMessage(false);
    setFailMessage(false);
    const userId = state.user.id;

    if (data.image?.length && imageChanged) {
      data.image = selectedImage.substring(21);
    }
    if (data.image == noImage) {
      data.image = "";
    }
    const result = await updateUser(
      userId,
      data.username,
      data.password,
      data.image
    );

    if (result.success) {
      setSuccessMessage("Your profile updated successfully!");
      const { username, email, _id, image } = result.body;
      dispatch({
        type: "setUser",
        payload: { username, id: _id, email, isLoggedIn: true, image },
      });
      setSuccessMessage("Your profile updated successfully!");
    } else {
      setFailMessage(result.message);
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  async function signOutHandler() {
    const result = await signOut();
    if (result.success) {
      dispatch({
        type: "setUser",
        payload: { id: "", username: "", email: "", isLoggedIn: false },
      });
      navigate("/login");
    } else {
      setFailMessage(result.message);
    }
  }
  async function deleteAccount() {
    if (!confirm("Are you sure for deleting your account?")) {
      return;
    }
    const id = state.user.id;
    const result = await deleteUser(id);
    if (result.success) {
      navigate("/login");
    } else {
      setFailMessage(result.message);
    }
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
      {failMessage && (
        <div className="my-10">
          <h3 className="bg-red-800 text-white py-3 px-2 rounded-md font-bold">
            {failMessage}
          </h3>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-10">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 flex flex-col justify-center items-center  ">
          <input
            {...imageField}
            id="selectImage"
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
          />

          <div className="cursor-pointer  " title="select profile picture">
            <label htmlFor="selectImage">
              <img
                src={selectedImage}
                className="rounded-full border-2 border-emerald-600 w-20 h-20 p-1"
              />
            </label>
          </div>
          <div
            className="mt-2 cursor-pointer text-red-700 border border-red-700 rounded-full hover:bg-red-700 hover:text-white "
            title="remove profile picture"
            onClick={handleRemoveImage}
          >
            <RxCross2 />
          </div>
        </div>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="text"
            {...register("username", {
              required: "Please enter your username",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input
            className="bg-slate-200 opacity-40 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="text"
            {...register("email")}
            disabled
          />
        </div>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="flex flex-col justify-between items-center">
          <button className="bg-emerald-600 mb-4 text-white w-full rounded-md py-3 text-lg font-semibold hover:bg-emerald-800">
            Upadte
          </button>
        </div>
      </form>
      <div className=" mt-2 flex justify-between items-center">
        <button
          to="/login"
          className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
        <button
          className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md"
          onClick={signOutHandler}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
