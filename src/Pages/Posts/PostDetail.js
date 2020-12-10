import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

//AXIOS HELPER
import axiosInstance from "../../Helpers/axios";

//post helpers
import { toggleLike, comentar } from "../../Helpers/post-helpers";

//estilos
import "./PostDetail.css";

//componenets loading
import LoadingPage from "../../Components/Loading/LoadingPage";
import Error404 from "../../Components/Loading/Error404";

//imagenes
import iconHeartSolidRed from "../../Images/iconos/heart-red.png";
import HeartRegular from "../../Images/iconos/heart-regular.png";
import UserDefault from "../../Images/iconos/user-default.jpg";

export default function PostDetail({ match, usuario }) {
  let idPost = match.params.id;
  const [post, setPost] = useState(null);
  const [cargandoPost, setCargandoPost] = useState(false);
  const [error404, setError404] = useState(false);

  useEffect(() => {
    async function getPost() {
      try {
        setCargandoPost(true);
        setError404(false);
        const { data } = await axiosInstance.get(`/posts/${idPost}/`);
        console.log(data);
        setPost(data);
        setCargandoPost(false);
      } catch (error) {
        if (error.response.status === 404) {
          setError404(true);
        }
        console.log(error);
        setCargandoPost(false);
      }
    }

    getPost();
  }, [idPost]);

  return (
    <div className="container__post-detail">
      {cargandoPost && <LoadingPage />}

      {error404 && <Error404 />}

      {post && usuario && (
        <>
          <ImagePost post={post} />
          <SectionComentarios post={post} usuario={usuario} />
        </>
      )}
    </div>
  );
}

function ImagePost({ post }) {
  let postInfo = post.post;
  return (
    <img className="postdetail__image-photo" src={postInfo.photo} alt="" />
  );
}

function SectionComentarios({ post, usuario }) {
  let postInfo = post.post;

  const [nuevosComentario, setNuevosComentarios] = useState([]);

  async function onSubmitComentario(content) {
    const newComment = await comentar(postInfo, content);
    setNuevosComentarios([...nuevosComentario, newComment]);
  }

  return (
    <div className="postdetail__comentarios-desktop">
      <div className="postdetail__info-user">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="postdetail__container-picture-user">
            {postInfo.profile.avatar ? (
              <img src={postInfo.profile.avatar} alt="" />
            ) : (
              <img src={UserDefault} alt="" />
            )}
          </div>
          <b className="title-user-name">
            <small> {postInfo.user.username} - Post </small>
          </b>
        </div>
      </div>
      <ListComments
        post={post}
        usuario={usuario}
        nuevosComentario={nuevosComentario}
      />
      <SectionLike post={post} usuario={usuario} />
      <FormComments onSubmitComentario={onSubmitComentario} />
    </div>
  );
}

function ListComments({ post, usuario, nuevosComentario }) {
  let postInfo = post.post;
  let postComments = post.comments;

  return (
    <ul className="container__post-comentarios">
      <li>
        <span>
          <Link to={`/${postInfo.user.username}`}>
            <b className="title-user-name">
              <small> {postInfo.user.username} </small>
            </b>
          </Link>
        </span>
        <span className="span-txt-comentario"> {postInfo.title} </span>
      </li>

      {postComments.map((comentario) => (
        <Comentario key={comentario.id} comentario={comentario} />
      ))}

      {nuevosComentario.map((newComment) => (
        <li key={newComment.id}>
          <span>
            <Link to={`/${usuario.username}`}>
              <b className="title-user-name">
                <small> {usuario.username} </small>
              </b>
            </Link>
          </span>
          <span className="span-txt-comentario"> {newComment.content} </span>
        </li>
      ))}
    </ul>
  );
}

function Comentario({ comentario }) {
  return (
    <li>
      <span>
        <Link to={`/${comentario.user.username}`}>
          <b className="title-user-name">
            <small> {comentario.user.username} </small>
          </b>
        </Link>
      </span>
      <span className="span-txt-comentario"> {comentario.content} </span>
    </li>
  );
}

function SectionLike({ post, usuario }) {
  let postInfo = post.post;
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    let likes = postInfo.likes;

    likes.filter(function (userlike) {
      if (usuario.id === userlike.id) {
        setIsLike(true);
        return setIsLike;
      } else {
        return setIsLike;
      }
    });
  }, [postInfo.likes, usuario.id]);

  async function onSubmitToggleLike() {
    try {
      await toggleLike(postInfo);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmitLike() {
    if (isLike) {
      setIsLike(false);
      postInfo.numLikes -= 1;
      onSubmitToggleLike();
    } else {
      setIsLike(true);
      postInfo.numLikes += 1;
      onSubmitToggleLike();
    }
  }

  return (
    <div className="cotainer__button-post-like">
      <div className="container__btn-like">
        {isLike ? (
          <button className="btn__like" onClick={onSubmitLike}>
            <img src={iconHeartSolidRed} alt="" />
          </button>
        ) : (
          <button className="btn__like" onClick={onSubmitLike}>
            <img src={HeartRegular} alt="" />
          </button>
        )}
        {postInfo.numLikes} Me gusta
      </div>
    </div>
  );
}

function FormComments({ onSubmitComentario }) {
  const [comentario, setComentario] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (enviandoComentario) {
      return;
    }

    try {
      setEnviandoComentario(true);
      await onSubmitComentario(comentario);
      setComentario("");
      setEnviandoComentario(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container__form-comentario">
      <form action=" form__comentario" onSubmit={onSubmit}>
        <input
          autoComplete="off"
          className="input__form-comentario"
          type="text"
          placeholder="Agrega un nuevo comentario"
          name="mensaje"
          onChange={(e) => setComentario(e.target.value)}
          value={comentario}
        />
      </form>
    </div>
  );
}
