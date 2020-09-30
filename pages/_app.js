import "../styles/globals.css";
import "../styles/header.css";
import "../styles/feed.css";
import "../styles/post_feed.css";
import "../styles/footerNavigation.css";
import "../styles/UploadImage.css";
import "../styles/profile.css";
import "../styles/post_detail.css";
import "../styles/edit_profile.css";
import "../styles/login.css";

import Nav from "../components/Nav/index";
import FooterNavigation from "../components/FooterNavigation/index";
import UploadImage from "../components/UploadImage/index";
import axiosInstance from "../Helpers/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Error from "../components/Error";
import Sucess_message from "../components/Sucess_message";
import {
  setToken,
  deleteToken,
  getToken,
  setUserNow,
  GetUsername,
  setTokenCookie,
} from "../Helpers/auth-helpers";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function OpenModalUpload() {
    router.push(`/${usuario.username}`);
    setIsOpenModal(true);
  }

  function CloseModalUpload() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      const currentUSER = GetUsername();
      try {
        const { data: usuario } = await axiosInstance.get(
          `/users/${currentUSER}/`
        );
        setUsuario(usuario.user);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await axiosInstance.post("/users/login/", {
      email,
      password,
    });

    setToken(data.access_token);
    setUserNow(data.user.username);
    setTokenCookie(data.access_token);
  }

  async function signup(usuario) {
    const { data } = await axiosInstance.post("/users/signup/", usuario);
  }

  function logout() {
    setUsuario(null);
    setUserNow(null);
    deleteToken();
    location.href = "/accounts/login";
  }

  async function edit_user(userUpdate) {
    const { data } = await axiosInstance.patch(
      `users/${usuario.username}/`,
      userUpdate
    );

    setUserNow(data.username);
    setUsuario(data);
  }

  async function edit_profile(profileUpdate) {
    const { data } = await axiosInstance.patch(
      `users/${usuario.username}/profile/`,
      profileUpdate
    );

    setUserNow(data.username);
  }

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function mostrarMensaje(success_message) {
    setSuccess(success_message);
  }

  function esconderError() {
    setError(null);
    setSuccess(null);
  }

  return (
    <div>
      <Nav usuario={usuario} OpenModalUpload={OpenModalUpload}></Nav>
      <div style={{ height: "70px" }}></div>
      <Error mensaje={error} esconderError={esconderError}></Error>
      <Sucess_message
        success_message={success}
        esconderError={esconderError}
      ></Sucess_message>
      <Component
        {...pageProps}
        login={login}
        signup={signup}
        usuario={usuario}
        mostrarError={mostrarError}
        mostrarMensaje={mostrarMensaje}
        edit_user={edit_user}
        edit_profile={edit_profile}
        logout={logout}
      />

      {usuario && (
        <FooterNavigation usuario={usuario} OpenModalUpload={OpenModalUpload} />
      )}

      {isOpenModal && (
        <UploadImage CloseModalUpload={CloseModalUpload}></UploadImage>
      )}
    </div>
  );
}

export default MyApp;
