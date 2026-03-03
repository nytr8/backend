import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

async function register(name, email, password) {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function login(name, email, password) {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { register };
