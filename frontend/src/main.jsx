import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/globalConstant.js"
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./router/router";
import { AppContextProvider } from "./Context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
