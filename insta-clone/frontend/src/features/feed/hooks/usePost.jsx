import { useContext } from "react";
import { getAllPosts, likePost, postCreate } from "../services/postApi.js";
import { PostContextProvider } from "../FeedContext.jsx";

const usePost = () => {
  const { postData, setpostData, loading, setloading } =
    useContext(PostContextProvider);

  async function handleAllPost() {
    let data = null;
    setloading(true);
    try {
      data = await getAllPosts();
      setpostData(data.allpost);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }
  async function handleCreatePost(file, caption) {
    setloading(true);

    try {
      const formData = new FormData();
      formData.append("media", file); // must match backend field name
      formData.append("caption", caption);

      const response = await postCreate(formData);

      // add newly created post on top
      setpostData([response.post, ...postData].reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }
  async function handleLike(postId) {
    setloading(true);
    let like = null;
    try {
      like = await likePost(postId);
      setpostData((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, isLiked: !post.isLiked } : post,
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  return {
    loading,
    postData,
    handleAllPost,
    handleCreatePost,
    handleLike,
  };
};

export default usePost;
