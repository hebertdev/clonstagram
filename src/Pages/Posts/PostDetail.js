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
import CommentRegular from "../../Images/iconos/comment-regular.png";

export default function PostDetail({ match, usuario }) {
  let id = match.params.id;
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevosComentario, setNuevosComentario] = useState([]);

  const [cargandoPost, setCargandoPost] = useState(false);
  const [error404, setError404] = useState(false);

  const [isOpenComentarios, setIsOpenComentarios] = useState(false);

  useEffect(() => {
    async function cargarPost() {
      try {
        setCargandoPost(true);
        setError404(false);

        const { data: post } = await axiosInstance.get(`/posts/${id}/`);
        setPost(post.post);
        setComentarios(post.comments);
        setCargandoPost(false);
      } catch (error) {
        setCargandoPost(false);

        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setError404(true);
        } else {
          console.log(error);
        }
      }
    }

    cargarPost();
  }, [id]);

  async function onSubmitComentario(content) {
    const newComent = await comentar(post, content);
    setNuevosComentario([...nuevosComentario, newComent]);
  }

  async function onSubmitLikeToggle() {
    try {
      await toggleLike(post);
    } catch (error) {
      console.log(error);
      console.log("Hubo un error al dar like");
    }
  }

  function CloseComentarios() {
    setIsOpenComentarios(false);
  }

  function OpenComentarios() {
    setIsOpenComentarios(true);
  }

  return (
    <>
      {cargandoPost && <LoadingPage />}

      {error404 && <Error404 />}

      {post && (
        <div>
          <div className="container__post-detail">
            <img className="postdetail__image-photo" src={post.photo} alt="" />

            <div className="Footer_post-comentario-movile">
              {usuario && (
                <FooterPost
                  post={post}
                  usuario={usuario}
                  onSubmitLikeToggle={onSubmitLikeToggle}
                  OpenComentarios={OpenComentarios}
                ></FooterPost>
              )}
              <div className="Post__feed-footer-comments">
                <form className="Post__feed-footer-form">
                  <input
                    type="text"
                    placeholder="Agregar un comentario"
                    name="mensaje"
                    onClick={OpenComentarios}
                  />
                </form>
              </div>
            </div>
            {isOpenComentarios && (
              <div className="postdetail__comentarios">
                <div className="postdetail__info-user">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="postdetail__container-picture-user">
                      {post.profile.avatar ? (
                        <img src={post.profile.avatar} alt="" />
                      ) : (
                        <img src={UserDefault} alt="" />
                      )}
                    </div>
                    <b className="title-user-name">
                      <small> {post.user.username} - Post </small>
                    </b>
                  </div>
                  <span
                    onClick={CloseComentarios}
                    className="btn-close-comentarios"
                  >
                    <b>X</b>
                  </span>
                </div>
                <ul className="container__post-comentarios">
                  <li>
                    <span>
                      <Link to={`/${post.user.username}`}>
                        <b className="title-user-name">
                          <small>{post.user.username} </small>
                        </b>
                      </Link>
                    </span>
                    <span className="span-txt-comentario"> {post.title} </span>
                  </li>

                  {comentarios.map((comentario) => (
                    <li key={comentario.id}>
                      <span>
                        <Link to={`/${comentario.user.username}`}>
                          <b className="title-user-name">
                            <small>{comentario.user.username}</small>
                          </b>
                        </Link>
                      </span>
                      <span className="span-txt-comentario">
                        {comentario.content}
                      </span>
                    </li>
                  ))}

                  {nuevosComentario.map((comentario) => (
                    <li key={comentario.id}>
                      <span>
                        <Link to={`/${usuario.username}`}>
                          <b className="title-user-name">
                            <small>{usuario.username}</small>
                          </b>
                        </Link>
                      </span>
                      <span className="span-txt-comentario">
                        {comentario.content}
                      </span>
                    </li>
                  ))}
                </ul>
                <FormComent
                  onSubmitComentario={onSubmitComentario}
                ></FormComent>
              </div>
            )}

            <div className="postdetail__comentarios-desktop">
              <div className="postdetail__info-user">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="postdetail__container-picture-user">
                    <img src={post.profile.avatar} alt="" />
                  </div>
                  <b className="title-user-name">
                    <small> {post.user.username} - Post </small>
                  </b>
                </div>
              </div>
              <ul className="container__post-comentarios">
                <li>
                  <span>
                    <Link to={`/${post.user.username}`}>
                      <b className="title-user-name">
                        <small>{post.user.username} </small>
                      </b>
                    </Link>
                  </span>
                  <span className="span-txt-comentario"> {post.title} </span>
                </li>

                {comentarios.map((comentario) => (
                  <li key={comentario.id}>
                    <span>
                      <Link to={`/${comentario.user.username}`}>
                        <b className="title-user-name">
                          <small>{comentario.user.username}</small>
                        </b>
                      </Link>
                    </span>
                    <span className="span-txt-comentario">
                      {comentario.content}
                    </span>
                  </li>
                ))}

                {nuevosComentario.map((comentario) => (
                  <li key={comentario.id}>
                    <span>
                      <Link to={`/${usuario.username}`}>
                        <b className="title-user-name">
                          <small>{usuario.username}</small>
                        </b>
                      </Link>
                    </span>
                    <span className="span-txt-comentario">
                      {comentario.content}
                    </span>
                  </li>
                ))}
              </ul>

              {usuario && (
                <Like
                  usuario={usuario}
                  post={post}
                  onSubmitLikeToggle={onSubmitLikeToggle}
                ></Like>
              )}
              <FormComent onSubmitComentario={onSubmitComentario}></FormComent>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: "55px" }}></div>
    </>
  );
}

function FormComent({ onSubmitComentario }) {
  const [mensaje, setMensaje] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (enviandoComentario) {
      return;
    }

    try {
      setEnviandoComentario(true);
      await onSubmitComentario(mensaje);
      setMensaje("");
      setEnviandoComentario(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container__form-comentario">
      <form action=" form__comentario" onSubmit={onSubmit}>
        <input
          className="input__form-comentario"
          type="text"
          placeholder="Agrega un nuevo comentario"
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </form>
    </div>
  );
}

function Like({ post, usuario, onSubmitLikeToggle }) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    post.likes.filter(function (user) {
      if (user.id === usuario.id) {
        setIsLike(true);
        return setIsLike;
      } else {
        return setIsLike;
      }
    });
  }, [usuario.id, post.likes]);

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
    <div className="cotainer__button-post-like">
      {isLike ? (
        <div className="container__btn-like">
          <button className="btn__like" onClick={onSubmitLike}>
            <img src={iconHeartSolidRed} alt="" />
          </button>
          {post.numLikes} Me gusta
        </div>
      ) : (
        <div className="container__btn-like">
          <button className="btn__like" onClick={onSubmitLike}>
            <img src={HeartRegular} alt="" />
          </button>
          {post.numLikes} Me gusta
        </div>
      )}
    </div>
  );
}

function FooterPost({ post, usuario, onSubmitLikeToggle, OpenComentarios }) {
  const [isLike, setIsLike] = useState(null);

  useEffect(() => {
    post.likes.filter(function (user) {
      if (user.id === usuario.id) {
        setIsLike(true);
        return setIsLike;
      } else {
        return setIsLike;
      }
    });
  }, [usuario.id, post.likes]);

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
            <img src={iconHeartSolidRed} alt="" />
          </button>
        ) : (
          <button
            className="Post__feed-footer-button-like"
            onClick={onSubmitLike}
          >
            <img src={HeartRegular} alt="" />
          </button>
        )}

        <span
          onClick={OpenComentarios}
          className="Post__feed-footer-link-comment"
        >
          <img src={CommentRegular} alt="" />
        </span>

        <br />
        <span className="Post__feed-footer-text-like">
          {post.numLikes} me gusta
        </span>

        <span className="Post__feed-footer-text-like" onClick={OpenComentarios}>
          {""}
          {""} Ver comentarios
        </span>
      </div>
    </div>
  );
}
