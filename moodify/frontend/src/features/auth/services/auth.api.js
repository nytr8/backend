import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

async function register(username, email, password) {
  let res = null;
  try {
    res = await api.post("/register", { username, email, password });
  } catch (error) {
    console.log(error);
  }
  return res.data;
}
async function login(username, email, password) {
  let res = null;
  try {
    res = await api.post("/login", { username, email, password });
  } catch (error) {
    console.log(error);
  }
  return res.data;
}
async function getMe() {
  let res = null;
  try {
    res = await api.get("/get-me");
  } catch (error) {
    console.log(error);
  }
  return res.data;
}
async function logout() {
  let res = null;
  try {
    res = await api.get("/logout");
  } catch (error) {
    console.log(error);
  }
  return res.data;
}

export { register, login, getMe, logout };
