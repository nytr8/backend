import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function followRequest(userId) {
  try {
    const response = await api.post(`/follow/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error; //
  }
}

export async function unfollowRequest(userId) {
  try {
    const response = await api.post(`/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function acceptFollowRequest(userId) {
  try {
    const response = await api.post(`/accept-req/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return null;
  }
}

export async function getMyFollowers() {
  try {
    const response = await api.get("/follow/followers");
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return null;
  }
}

export async function getMyFollowing() {
  try {
    const response = await api.get("/follow/following");
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return null;
  }
}
export async function getAllUsers() {
  try {
    const response = await api.get("/alluser");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
