import Home from "../page/Home";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import About from "../page/About";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Profile from "../page/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <SignIn /> },
      { path: "Register", element: <SignUp /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
export default router;
