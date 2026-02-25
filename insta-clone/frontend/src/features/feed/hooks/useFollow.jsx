import { useContext } from "react";
import { FollowContextProvider } from "../FollowContext";
import {
  acceptFollowRequest,
  followRequest,
  getAllUsers,
  getMyFollowers,
  getMyFollowing,
  unfollowRequest,
} from "../services/followApi";

const useFollow = () => {
  const {
    loading,
    setLoading,
    followers,
    setFollowers,
    following,
    setFollowing,
    error,
    setError,
    allusers,
    setallUsers,
  } = useContext(FollowContextProvider);

  async function fetchFollowers() {
    setLoading(true);
    try {
      const data = await getMyFollowers();
      setFollowers(data?.followers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function fetchFollowing() {
    setLoading(true);
    try {
      const data = await getMyFollowing();
      setFollowing(data?.following || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleFollow(userId) {
    setLoading(true);
    try {
      const data = await followRequest(userId);
      // Re-fetch following so the new entry is fully populated
      // and the suggestion filter immediately excludes this user
      await fetchFollowing();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleUnfollow(userId) {
    setLoading(true);
    try {
      const data = await unfollowRequest(userId);
      // Re-fetch so the unfollowed user reappears in suggestions
      await fetchFollowing();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleAcceptRequest(userId) {
    setLoading(true);
    try {
      const data = await acceptFollowRequest(userId);
      await fetchFollowers(); // refresh followers after accepting
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function getallUsers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setallUsers(data?.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    error,
    followers,
    following,
    allusers,
    fetchFollowers,
    fetchFollowing,
    handleFollow,
    handleUnfollow,
    handleAcceptRequest,
    getallUsers,
  };
};

export default useFollow;
