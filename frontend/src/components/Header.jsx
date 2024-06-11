import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

export default function Header() {
  const { state, dispatch } = useAppContext();
  let profilePic;
  if (state.user?.image) {
    if (state.user.image.includes("uploads")) {
      profilePic = SERVER_URL + state.user.image;
    } else {
      profilePic = state.user.image;
    }
  } else {
    profilePic = SERVER_URL + "/uploads/user1718051367920.png";
  }

  return (
    <div className="bg-emerald-500 text-white flex justify-between px-5 py-4">
      <h3 className="font-bold text-xl">
        {state.user.isLoggedIn ? state.user.username : "Auth App"}
      </h3>
      <div className=" flex justify-between items-center">
        <Link
          className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md mx-5"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md mx-5"
          to="about"
        >
          About
        </Link>
        {state.user.isLoggedIn ? (
          <Link to="profile" className="text-lg font-semibold rounded-md px-2">
            <img className="h-8 w-8 rounded-full" src={profilePic} />
          </Link>
        ) : (
          <Link
            className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md ml-5"
            to="login"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
