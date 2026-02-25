import axios from "axios";

export async function getAllPosts() {
  let res = null;
  try {
    res = await axios.get("http://localhost:3000/api/posts/allpost", {
      withCredentials: true,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return res.data;
}
export async function postCreate(formData) {
  let res = null;
  try {
    res = await axios.post(
      "http://localhost:3000/api/posts/",

      formData,

      { withCredentials: true },
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return res.data;
}
export async function likePost(postId) {
  let res = null;
  try {
    res = await axios.post(
      `http://localhost:3000/api/like/${postId}`,
      {},
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return res.data;
}

