import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

export async function registerUser(user) {
  try {
    const { data } = await axios.post("/auth/register", user);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}

export async function login(user) {
  try {
    const { data } = await axios.post("/auth/login", user);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
export async function authGoogle(user) {
  try {
    const { data } = await axios.post("/auth/google", user);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
export async function initialize() {
  try {
    const { data } = await axios.get("/misc/initialize");
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}

export async function updateUser(id, username, password, image) {
  try {
    const { data } = await axios.put(`/user/${id}`, {
      username,
      password,
      image,
    });
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await axios.post("/uploads", form);

    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
export async function signOut() {
  try {
    const { data } = await axios.get("/auth/signout");
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete("/user/" + id);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
