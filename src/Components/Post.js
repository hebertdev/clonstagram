import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

//estilos
import "./Post.css";

//Iconos post
import HeartRegular from "../Images/iconos/heart-regular.png";
import HeartSolidRed from "../Images/iconos/heart-red.png";
import CommentRegular from "../Images/iconos/comment-regular.png";
import UserDefault from "../Images/iconos/user-default.jpg";

//post helpers
import { toggleLike, comentar } from "../Helpers/post-helpers";

export default function Post({ post, usuario }) {
  return (
    <div className="Post__feed">
      <PostHeader post={post} />
      <PostImage post={post} />

      {usuario && <PostFooter post={post} usuario={usuario} />}
    </div>
  );
}

function PostHeader({ post }) {
  return (
    <div className="Post__feed-header">
      <Link
        to={`/${post.user.username}`}
        className="Post__feed-header-link-user"
      >
        <div className="Post__feed-header-picture">
          {post.profile.avatar ? (
            <img src={post.profile.avatar} alt="" />
          ) : (
            <img src={UserDefault} alt="" />
          )}
        </div>
        <div>
          <span className="Post__feed-footer-text-like">
            {" "}
            {post.user.username}{" "}
          </span>
        </div>
      </Link>
    </div>
  );
}

function PostImage({ post }) {
  return (
    <div className="Post__feed-picture">
      <img src={post.photo} alt="" />
    </div>
  );
}

function PostFooter({ post, usuario }) {
  return (
    <div className="Post__feed-footer">
      <PostFooterLikes post={post} usuario={usuario} />
      <PostFooterComments post={post} usuario={usuario} />
    </div>
  );
}

function PostFooterLikes({ post, usuario }) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    let likes = post.likes;

    likes.filter(function (userlike) {
      if (usuario.id === userlike.id) {
        setIsLike(true);
        return setIsLike;
      } else {
        return setIsLike;
      }
    });
  }, [post.likes, usuario.id]);

  async function onSubmitToggleLike() {
    try {
      await toggleLike(post);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmitLike() {
    if (isLike) {
      setIsLike(false);
      post.numLikes -= 1;
      onSubmitToggleLike();
    } else {
      setIsLike(true);
      post.numLikes += 1;
      onSubmitToggleLike();
    }
  }

  return (
    <div className="Post__feed-footer-icons">
      {isLike === true ? (
        <button
          className="Post__feed-footer-button-like"
          onClick={onSubmitLike}
        >
          <img src={HeartSolidRed} alt="" />
        </button>
      ) : (
        <button
          className="Post__feed-footer-button-like"
          onClick={onSubmitLike}
        >
          <img src={HeartRegular} alt="" />
        </button>
      )}

      <Link to={`/posts/${post.id}`} className="Post__feed-footer-link-comment">
        <img src={CommentRegular} alt="" />
      </Link>
      <br />
      <span className="Post__feed-footer-text-like">
        {post.numLikes} me gusta
      </span>
    </div>
  );
}

function PostFooterComments({ post, usuario }) {
  const [comentario, setComentario] = useState("");
  const [nuevosComentario, setNuevosComentarios] = useState([]);
  const [numComentario, setNumComentario] = useState(post.numComments);
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  async function onSubmitComentario(content) {
    const newComment = await comentar(post, content);
    setNuevosComentarios([...nuevosComentario, newComment]);
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (enviandoComentario) {
      return;
    }

    try {
      setEnviandoComentario(true);
      await onSubmitComentario(comentario);
      setComentario("");
      setNumComentario(numComentario + 1);
      setEnviandoComentario(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="Post__feed-footer-comments">
        <ul className="Post__feed-footer-comments-ul">
          <li>
            <Link to={`/${post.user.username}`}>
              <span className="Post__feed-footer-text-like">
                {post.user.username}
              </span>
            </Link>
            <span className="txt-comment"> {post.title} </span>
          </li>

          {numComentario > 0 && (
            <li>
              <Link to={`/posts/${post.id}`} style={{ color: "#6666667a" }}>
                <span
                  className="Post__feed-footer-text-like"
                  style={{ color: "#6666667a" }}
                >
                  Ver los {numComentario} comentarios
                </span>
              </Link>
            </li>
          )}

          {nuevosComentario.map((comment) => (
            <li key={comment.id}>
              <Link to={`/${usuario.username}`}>
                <span className="Post__feed-footer-text-like">
                  {usuario.username}
                </span>
              </Link>
              <span className="txt-comment"> {comment.content} </span>
            </li>
          ))}
        </ul>
      </div>
      <form className="Post__feed-footer-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Agregar un comentario"
          onChange={(e) => setComentario(e.target.value)}
          value={comentario}
        />
      </form>
    </>
  );
}
