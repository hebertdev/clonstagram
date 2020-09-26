import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axiosInstance from "../../Helpers/axios";
import { exportBASEurl } from "../../Helpers/axios";
import { comentar, toggleLike } from "../../Helpers/post-helpers";
import Link from "next/link";

import Container from "../../components/container/index";
import Post from "../../components/Post/index";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostDetail({ usuario }) {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevosComentario, setNuevosComentario] = useState([]);
  const [enviandoLike, setEnviandoLike] = useState(false);

  const [postNoExiste, setPostNoExiste] = useState(false);
  const [isOpenComentarios, setIsOpenComentarios] = useState(false);

  useEffect(() => {
    async function cargarPost() {
      try {
        const { data: post } = await axiosInstance.get(`/posts/${id}/`);
        setPost(post.post);
        setComentarios(post.comments);
        console.log(post.post);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          console.log("hubo un error");
          setPostNoExiste(true);
        } else {
          console.log("hebertdev");
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
      const postActualizado = await toggleLike(post);
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
    <Container>
      {post && (
        <div>
          <div className="container__post-detail">
            <img className="postdetail__image-photo" src={post.photo} alt="" />

            <div className="Footer_post-comentario-movile">
              {" "}
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
                      <img src={post.profile.avatar} alt="" />
                    </div>
                    <b className="title-user-name">
                      {" "}
                      <small> {post.user.username} - Post </small>{" "}
                    </b>
                  </div>
                  <span
                    onClick={CloseComentarios}
                    className="btn-close-comentarios"
                  >
                    {" "}
                    <b>X</b>{" "}
                  </span>
                </div>
                <ul className="container__post-comentarios">
                  <li>
                    {" "}
                    <span>
                      {" "}
                      <Link href={`/${post.user.username}`}>
                        <a>
                          <b className="title-user-name">
                            {" "}
                            <small>{post.user.username} </small>{" "}
                          </b>{" "}
                        </a>
                      </Link>
                    </span>{" "}
                    <span className="span-txt-comentario"> {post.title} </span>
                  </li>

                  {comentarios.map((comentario) => (
                    <li key={comentario.id}>
                      {" "}
                      <span>
                        {" "}
                        <Link href={`/${comentario.user.username}`}>
                          <a>
                            <b className="title-user-name">
                              {" "}
                              <small>{comentario.user.username}</small>{" "}
                            </b>{" "}
                          </a>
                        </Link>
                      </span>{" "}
                      <span className="span-txt-comentario">
                        {" "}
                        {comentario.content}{" "}
                      </span>
                    </li>
                  ))}

                  {nuevosComentario.map((comentario) => (
                    <li key={comentario.id}>
                      {" "}
                      <span>
                        {" "}
                        <Link href={`/${usuario.username}`}>
                          <a>
                            <b className="title-user-name">
                              {" "}
                              <small>{usuario.username}</small>{" "}
                            </b>{" "}
                          </a>
                        </Link>
                      </span>{" "}
                      <span className="span-txt-comentario">
                        {" "}
                        {comentario.content}{" "}
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
                    {" "}
                    <small> {post.user.username} - Post </small>{" "}
                  </b>
                </div>
              </div>
              <ul className="container__post-comentarios">
                <li>
                  {" "}
                  <span>
                    {" "}
                    <Link href={`/${post.user.username}`}>
                      <a>
                        <b className="title-user-name">
                          {" "}
                          <small>{post.user.username} </small>{" "}
                        </b>{" "}
                      </a>
                    </Link>
                  </span>{" "}
                  <span className="span-txt-comentario"> {post.title} </span>
                </li>

                {comentarios.map((comentario) => (
                  <li key={comentario.id}>
                    {" "}
                    <span>
                      {" "}
                      <Link href={`/${comentario.user.username}`}>
                        <a>
                          <b className="title-user-name">
                            {" "}
                            <small>{comentario.user.username}</small>{" "}
                          </b>{" "}
                        </a>
                      </Link>
                    </span>{" "}
                    <span className="span-txt-comentario">
                      {" "}
                      {comentario.content}{" "}
                    </span>
                  </li>
                ))}

                {nuevosComentario.map((comentario) => (
                  <li key={comentario.id}>
                    {" "}
                    <span>
                      {" "}
                      <Link href={`/${usuario.username}`}>
                        <a>
                          <b className="title-user-name">
                            {" "}
                            <small>{usuario.username}</small>{" "}
                          </b>{" "}
                        </a>
                      </Link>
                    </span>{" "}
                    <span className="span-txt-comentario">
                      {" "}
                      {comentario.content}{" "}
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
    </Container>
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
    <div className="cotainer__button-post-like">
      {isLike ? (
        <div className="container__btn-like">
          <button className="btn__like" onClick={onSubmitLike}>
            <img src="../imagenes/heart-red.png" alt="" />
          </button>
          {post.numLikes} Me gusta
        </div>
      ) : (
        <div className="container__btn-like">
          <button className="btn__like" onClick={onSubmitLike}>
            <img src="../imagenes/heart-regular.png" alt="" />
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

        <a onClick={OpenComentarios} className="Post__feed-footer-link-comment">
          <img src="../imagenes/comment-regular.png" alt="" />
        </a>

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
