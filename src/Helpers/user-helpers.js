import axiosInstance from "./axios";

export async function toggleFollow(username) {
  const { data } = await axiosInstance.post(`/users/${username}/follow/`);
  return data;
}
