import React from "react";
import { useAppContext } from "../Context/AppContext";

export default function Initializer() {
  const { state, dispatch } = useAppContext();
  if (state.initializedError) {
    return (
      <div>
        <h2 className="mb-5">{state.initializedError}</h2>
        <button className="" onClick={state.initializeApp}>
          <span>Tray Again</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className=" flex justify-center text-4xl text-emerald-700 font-bold items-center w-screen h-screen">
        <h2 className="">Loading ...</h2>
      </div>
    );
  }
}
