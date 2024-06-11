import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { app } from "../fireBase";
import { authGoogle } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

export default function OathGoogle() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  async function GoogleHandler() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const result2 = await authGoogle({
        email: result.user.email,
        username: result.user.displayName,
        image: result.user.photoURL,
      });
      if (result2.success) {
        const user = {
          id: result2.body._id,
          isLoggedIn: true,
          username: result2.body.username,
          email: result2.body.email,
          image: result2.body.image,
        };
        dispatch({ type: "setUser", payload: user });
        navigate("/profile");
      }
    } catch (e) {
      console.log("error is: ", e);
    }
  }
  return (
    <div className="w-full">
      <button
        type="button"
        className="bg-red-700  text-white hover:bg-red-800 w-full rounded-md py-3 font-semibold text-lg"
        onClick={() => GoogleHandler()}
      >
        Continue with google
      </button>
    </div>
  );
}
