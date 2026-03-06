import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/song";

const app = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getSong(mood) {
  const response = await app.get(`/getSong?mood=${mood}`);
  return response.data;
}
export async function getSonglist(mood) {
  const response = await app.get(`/getSongList?mood=${mood}`);
  return response.data;
}
