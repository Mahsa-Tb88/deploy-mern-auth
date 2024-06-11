export function appReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setUser":
      return { ...state, user: payload };
    case "setInitialized":
      return { ...state, initialized: payload };
    case "setError":
      return { ...state, initializedError: payload };
  }
}
