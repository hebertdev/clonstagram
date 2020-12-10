import axiosInstance from "./axios";

export async function toggleLike(post) {
  const { data } = await axiosInstance.post(`/posts/${post.id}/likes/`);
  return data;
}

export async function comentar(post, content) {
  const { data } = await axiosInstance.post(`/posts/${post.id}/comentarios/`, {
    content,
    user: 1,
    profile: 5,
  });
  console.log(data);
  return data;
}
