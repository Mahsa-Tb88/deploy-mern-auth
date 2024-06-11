import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./appReducer";
import { initialize } from "../utils/api";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: {
      id: "",
      isLoggedIn: false,
      username: "",
      email: "",
      image: "",
    },
    initialized: false,
    initializedError: false,
    initializeApp,
  });

  useEffect(() => {
    const timeOut = setTimeout(initializeApp, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function initializeApp() {
    dispatch({ type: "setError", payload: false });
    const result = await initialize();

    if (result.success) {
      const { body } = result;
      let user = {};
      if (body._id) {
        user = {
          id: body._id,
          email: body.email,
          username: body.username,
          image: body.image,
          isLoggedIn: true,
        };
        dispatch({ type: "setUser", payload: user });
      }

      dispatch({ type: "setInitialized", payload: true });
    } else {
      dispatch({ type: "setError", payload: result.message });
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppContextProvider, useAppContext };
