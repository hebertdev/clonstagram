import axiosInstance from "./axios";

export async function comentar(post, content) {
  const { data: nuevoComentario } = await axiosInstance.post(
    `posts/${post.id}/comentarios/`,
    {
      content,
      user: 1,
      profile: 1,
    }
  );

  return nuevoComentario;
}

export async function toggleLike(post) {
  const { data: newpost } = await axiosInstance.post(`posts/${post.id}/likes/`);

  return newpost;
}
