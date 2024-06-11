import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useAppContext } from "./Context/AppContext";
import Initializer from "./page/Initializer";

export default function App() {
  const { state, dispatch } = useAppContext();
  if (!state.initialized || state.initializedError) {
    return <Initializer />;
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
