import { useState, useEffect } from "react";
import Link from "next/link";
import { comentar, toggleLike } from "../../Helpers/post-helpers";

export default function Post({ post, usuario }) {
  async function onSubmitLikeToggle() {
    try {
      const { data } = await toggleLike(post);
    } catch (error) {
      console.log(error);
      console.log("Hubo un error al dar like");
    }
  }

  return (
    <div className="Post__feed">
      <HeaderPost post={post}></HeaderPost>
      <div className="Post__feed-picture">
        <img src={post.photo} alt="" />
      </div>
      {usuario && (
        <FooterPost
          post={post}
          usuario={usuario}
          onSubmitLikeToggle={onSubmitLikeToggle}
        ></FooterPost>
      )}
    </div>
  );
}

function HeaderPost({ post }) {
  return (
    <div className="Post__feed-header">
      <Link href={`/${post.user.username}`}>
        <a className="Post__feed-header-link-user">
          <div className="Post__feed-header-picture">
            {post.profile.avatar && <img src={post.profile.avatar} alt="" />}
            {!post.profile.avatar && (
              <img src="../imagenes/user-default.jpg" alt="" />
            )}
          </div>
          <div>
            <span className="Post__feed-footer-text-like">
              {post.user.username}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export function FooterPost({ post, usuario, onSubmitLikeToggle }) {
  const [isLike, setIsLike] = useState(null);

  useEffect(() => {
    const userLike = post.likes.filter(function (user) {
      if (user.id == usuario.id) {
        setIsLike(true);
      }
    });
  }, []);

  function onSubmitLike() {
    if (isLike) {
      setIsLike(false);
      post.numLikes -= 1;
      onSubmitLikeToggle();
    } else {
      setIsLike(true);
      post.numLikes += 1;
      onSubmitLikeToggle();
    }
  }

  return (
    <div className="Post__feed-footer">
      <div className="Post__feed-footer-icons">
        {isLike ? (
          <button
            className="Post__feed-footer-button-like"
            onClick={onSubmitLike}
          >
            <img src="../imagenes/heart-red.png" alt="" />
          </button>
        ) : (
          <button
            className="Post__feed-footer-button-like"
            onClick={onSubmitLike}
          >
            <img src="../imagenes/heart-regular.png" alt="" />
          </button>
        )}

        <Link href={`/posts/${post.id}`}>
          <a className="Post__feed-footer-link-comment">
            <img src="../imagenes/comment-regular.png" alt="" />
          </a>
        </Link>
        <br />
        <span className="Post__feed-footer-text-like">
          {post.numLikes} me gusta
        </span>
      </div>
      <FooterPostComentarios
        post={post}
        usuario={usuario}
      ></FooterPostComentarios>
    </div>
  );
}

function FooterPostComentarios({ post, usuario }) {
  const [nuevosComentario, setNuevosComentario] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [numCometario, setNumComentario] = useState(post.numComments);
  async function onSubmit(e) {
    e.preventDefault();
    if (enviandoComentario) {
      return;
    }

    try {
      setEnviandoComentario(true);
      await onSubmitComentario(mensaje);
      setNumComentario(numCometario + 1);
      setMensaje("");
      setEnviandoComentario(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitComentario(content) {
    const newComent = await comentar(post, content);
    setNuevosComentario([...nuevosComentario, newComent]);
  }

  return (
    <div>
      <div className="Post__feed-footer-comments">
        <ul className="Post__feed-footer-comments-ul">
          <li>
            <Link href={`/${post.user.username}`}>
              <a>
                <span className="Post__feed-footer-text-like">
                  {post.user.username}
                </span>
              </a>
            </Link>
            <span className="txt-comment">{post.title} </span>
          </li>
          <br />
          <li>
            {numCometario > 0 && (
              <Link href={`/posts/${post.id}`}>
                <a style={{ color: "#6666667a" }}>
                  <span
                    className="Post__feed-footer-text-like"
                    style={{ color: "#6666667a" }}
                  >
                    Ver los {numCometario} comentarios
                  </span>
                </a>
              </Link>
            )}
          </li>

          {nuevosComentario.map((comentario) => (
            <li key={comentario.id}>
              <Link href={`/${usuario.username}`}>
                <a>
                  <span className="Post__feed-footer-text-like">
                    {" "}
                    {usuario.username}{" "}
                  </span>
                </a>
              </Link>
              <span className="txt-comment"> {comentario.content} </span>
            </li>
          ))}
        </ul>
      </div>
      <form className="Post__feed-footer-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Agregar un comentario"
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </form>
    </div>
  );
}
