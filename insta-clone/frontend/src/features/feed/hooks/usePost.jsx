import { useContext } from "react";
import { getAllPosts } from "../services/postApi.js";
import { PostContextProvider } from "../feedContext.jsx";

const usePost = () => {
  const { postData, setpostData } = useContext(PostContextProvider);
  async function handleAllPost() {
    const data = await getAllPosts();
    setpostData(data.allpost);
  }
  console.log(postData);
  return { postData, handleAllPost };
};

export default usePost;
