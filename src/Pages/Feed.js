import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

//axios helper
import axiosInstance from "../Helpers/axios";

//esitlos
import "./Feed.css";

//componentes
import Post from "../Components/Post";

//componentes loading
import LoadingPost from "../Components/Loading/LoadingPost";
import LoadingUser from "../Components/Loading/LoadingUser";

//iconos feed
import UserDefault from "../Images/iconos/user-default.jpg";

export default function Feed({ usuario }) {
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [nextPage, setNextPage] = useState();

  useEffect(() => {
    async function getPosts() {
      try {
        setLoadingPost(true);
        const { data } = await axiosInstance.get("/posts/");
        console.log(data);
        setPosts(data.results);
        setNextPage(data.next);
        setLoadingPost(false);
      } catch (error) {
        console.log(error);
        setLoadingPost(false);
      }
    }

    getPosts();
  }, []);

  async function cargarMasPosts() {
    try {
      setLoadingPost(true);
      const { data } = await axiosInstance.get(`${nextPage}`);
      let nuevosPosts = data.results;
      setNextPage(data.next);
      setPosts((viejosPosts) => [...viejosPosts, ...nuevosPosts]);
      setLoadingPost(false);
    } catch (error) {
      console.log(error);
      setLoadingPost(false);
    }
  }

  return (
    <div className="Container__feed">
      <div className="Contianer__feed-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} usuario={usuario} />
        ))}

        {loadingPost && (
          <>
            <LoadingPost /> <br /> <LoadingPost />
          </>
        )}

        {nextPage && (
          <button className="btn__feed-cargarmasposts" onClick={cargarMasPosts}>
            cargar más posts
          </button>
        )}

        <div style={{ height: "60px" }} />
      </div>

      {usuario && <ContianerRigthFeed usuario={usuario} />}
    </div>
  );
}

function ContianerRigthFeed({ usuario }) {
  return (
    <div className="Contianer__feed-right">
      <div className="Contianer__feed-right-user">
        <a href="/" className="Contianer__feed-right-user-picture">
          {usuario.profile.avatar ? (
            <img src={usuario.profile.avatar} alt="" />
          ) : (
            <img src={UserDefault} alt="" />
          )}
        </a>
        <div>
          <span style={{ fontWeight: 600 }}>
            <a href="/" style={{ color: "#585858" }}>
              {usuario.username}
            </a>
          </span>
          <br />
          <span>
            <small style={{ color: "#666" }}>
              {usuario.first_name} {usuario.last_name}
            </small>
          </span>
        </div>
      </div>
      <span style={{ margin: "10px 5px", color: "#666", display: "block" }}>
        Sugerencias para ti
      </span>

      <SugerenciasUsuarios usuario={usuario} />
    </div>
  );
}

function SugerenciasUsuarios({ usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setCargandoUsuarios(true);
        const { data } = await axiosInstance.get(`/users/`);

        setUsuarios(data.results);
        setCargandoUsuarios(false);
      } catch (error) {
        console.log(error);
        setCargandoUsuarios(false);
      }
    }

    getUsers();
  }, []);

  return (
    <ul className="Contianer__feed-right-ul-users">
      {cargandoUsuarios && <LoadingUser />}

      {usuarios.map((user) => (
        <User key={user.id} user={user} usuario={usuario} />
      ))}
    </ul>
  );
}

function User({ usuario, user }) {
  return (
    <>
      {usuario.username === user.username ? null : (
        <li>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to={`/${user.username}`}
              className="Contianer__feed-right-user-picture-li"
            >
              {user.profile.avatar ? (
                <img src={user.profile.avatar} alt="" />
              ) : (
                <img src={UserDefault} alt="" />
              )}
            </Link>
            <div>
              <span style={{ fontWeight: 600 }}>
                <Link
                  to={`/${user.username}`}
                  style={{ color: "#585858", textDecoration: "none" }}
                >
                  {user.username}
                </Link>
              </span>
              <br />
              <span>
                <small style={{ color: "#666" }}>
                  {user.first_name} {user.last_name}
                </small>
              </span>
            </div>
          </div>
          <Link to={`/${user.username}`} className="btn-seguir-users">
            ver perfil
          </Link>
        </li>
      )}
    </>
  );
}
