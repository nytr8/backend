import axios from "axios";

async function login(username, password) {
  let res = null;
  try {
    res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        userName: username,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    throw error;
  }
  return res.data;
}
async function register(username, email, password) {
  let res = null;
  try {
    res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        userName: username,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    throw error;
  }

  return res.data;
}

export { login, register };
