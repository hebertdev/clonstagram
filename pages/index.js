import Container from "../components/container/index";
import Reat, { useEffect, useState } from "react";
import axiosInstance from "../Helpers/axios";
import Post from "../components/Post/index";
import Link from "next/link";
import { getToken } from "../Helpers/auth-helpers";
import Router from "next/router";

//importando los loader para el feed

import LoaderFeedPosts from "../components/LoaderFeedPosts";
import LoaderUserFeed from "../components/loaderUserFeed";

async function cargarPosts() {
  const { data: Posts } = await axiosInstance.get("/posts/");
  return Posts;
}

export default function Home({ usuario }) {
  const [posts, setPosts] = useState([]);
  const [nextload, setNextLoad] = useState();
  const [cargandoPosts, setCargandoPosts] = useState(true);

  useEffect(() => {
    async function cargarPostsIniciales() {
      try {
        setCargandoPosts(true);
        const nuevosPosts = await cargarPosts();
        setPosts(nuevosPosts.results);
        setNextLoad(nuevosPosts.next);
        setCargandoPosts(false);
      } catch (error) {
        console.log("Hubo un error al cargar tu feed");
        console.log(error);
        setCargandoPosts(false);
      }
    }
    cargarPostsIniciales();
  }, []);

  async function CargarMasPostEnElFeed() {
    try {
      setCargandoPosts(true);
      const { data: NuevosPostsDelFeed } = await axiosInstance.get(
        `${nextload}`
      );

      let nuevosPostscargados = NuevosPostsDelFeed.results;

      setNextLoad(NuevosPostsDelFeed.next);

      setCargandoPosts(false);
      setPosts((viejosPosts) => [...viejosPosts, ...nuevosPostscargados]);
    } catch (error) {
      console.log(error);
      setCargandoPosts(false);
    }
  }

  async function IfUser() {
    if (!getToken()) {
      Router.push("/accounts/login");
    }
  }
  IfUser();

  return (
    <div className="Container__feed">
      <div className="Contianer__feed-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} usuario={usuario} />
        ))}

        {cargandoPosts == true && (
          <div>
            <LoaderFeedPosts></LoaderFeedPosts>
            <LoaderFeedPosts></LoaderFeedPosts>
          </div>
        )}

        {nextload && (
          <button
            onClick={CargarMasPostEnElFeed}
            className="btn__feed-cargarmasposts"
          >
            Cargar mas posts
          </button>
        )}

        <div style={{ height: "60px" }} />
      </div>

      {usuario && <ContainerRightFeed usuario={usuario} />}
    </div>
  );
}

function ContainerRightFeed({ usuario }) {
  return (
    <div className="Contianer__feed-right">
      <div className="Contianer__feed-right-user">
        <Link href={`/${usuario.username}`}>
          <a className="Contianer__feed-right-user-picture">
            {usuario.profile.avatar && (
              <img src={usuario.profile.avatar} alt="" />
            )}
            {!usuario.profile.avatar && (
              <img src="../imagenes/user-default.jpg" alt="" />
            )}
          </a>
        </Link>
        <div>
          <span style={{ fontWeight: 600 }}>
            <Link href={`/${usuario.username}`}>
              <a style={{ color: "#585858" }}>{usuario.username}</a>
            </Link>
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
      <ul className="Contianer__feed-right-ul-users">
        <UserSuggestion usuario={usuario}></UserSuggestion>
      </ul>
    </div>
  );
}

function UserSuggestion({ usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);

  useEffect(() => {
    async function obtenerUsuarios() {
      try {
        setCargandoUsuarios(true);
        const { data: usuarios } = await axiosInstance.get("users/");
        setUsuarios(usuarios.results);
        setCargandoUsuarios(false);
      } catch (error) {
        console.log("Hubo un error al cargar tu usuarios");
        console.log(error);
        setCargandoUsuarios(false);
      }
    }

    obtenerUsuarios();
  }, []);

  return (
    <div>
      {cargandoUsuarios == true && (
        <div>
          <LoaderUserFeed></LoaderUserFeed>
          <LoaderUserFeed></LoaderUserFeed>
          <LoaderUserFeed></LoaderUserFeed>
        </div>
      )}

      {usuarios.map((user) => (
        <li key={user.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href={`/${user.username}`}>
              <a className="Contianer__feed-right-user-picture-li">
                {user.profile.avatar && (
                  <img src={user.profile.avatar} alt="" />
                )}

                {!user.profile.avatar && (
                  <img src="../imagenes/user-default.jpg" alt="" />
                )}
              </a>
            </Link>
            <div>
              <span style={{ fontWeight: 600 }}>
                <Link href={`/${user.username}`}>
                  <a style={{ color: "#585858", textDecoration: "none" }}>
                    {user.username}
                  </a>
                </Link>
              </span>{" "}
              <br />
              <span>
                <small style={{ color: "#666" }}>
                  {" "}
                  {user.first_name} {user.last_name}
                </small>
              </span>
            </div>
          </div>
          {usuario.id == user.id && (
            <Link href="/accounts/edit">
              <a className="btn-seguir-users">Editar perfil</a>
            </Link>
          )}

          {usuario.id !== user.id && (
            <Link href={`/${user.username}`}>
              <a className="btn-seguir-users">Ver perfil</a>
            </Link>
          )}
        </li>
      ))}
    </div>
  );
}
