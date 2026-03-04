import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/songs";

const app = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getSong(mood) {
  const response = await app.get(`/?mood=${mood}`);
  return response.data;
}
