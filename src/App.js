import React, { useState, useEffect } from "react";
import "./App.css";

//react router
import { BrowserRouter, Switch, Route } from "react-router-dom";

//auth helpers
import {
  setToken,
  setCurrentUser,
  getUsername,
  deleteToken,
} from "./Helpers/auth-helpers";

//axios helpers
import axiosInstance, { axiosInterceptors, url } from "./Helpers/axios";

//componentes
import Header from "./Components/Header";
import Alerta from "./Components/Alerta";

//componente - portal
import Modal from "./Components/Modal/Modal";

//Pages logout
import Login from "./Pages/accounts/Login";
import Signup from "./Pages/accounts/Signup";
//pages login
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/accounts/EditProfile";
import PostDetail from "./Pages/Posts/PostDetail";

axiosInterceptors();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [mensajeAlerta, setMensajeAlerta] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function closeModal() {
    setIsOpenModal(false);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  useEffect(() => {
    async function getUser() {
      if (!getUsername()) {
        return;
      }

      const user = getUsername();

      try {
        const { data } = await axiosInstance.get(`/users/${user}/`);

        setUsuario(data.user);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  //metodos de autenticacion
  async function login(email, password) {
    const { data } = await axiosInstance.post("/users/login/", {
      email,
      password,
    });
    setToken(data.access_token);
    setCurrentUser(data.user.username);
  }

  async function signup(newuser) {
    const { data } = await axiosInstance.post("/users/signup/", newuser);

    console.log(data);
  }

  function logout() {
    deleteToken();
    setUsuario(null);
  }

  //manejo de actualizaciones del usuario
  async function editProfile(profile) {
    const { data } = await axiosInstance.patch(
      `/users/${usuario.username}/profile/`,
      profile
    );

    var nuevaImagen = `${url()}${data.profile.avatar} `;
    var nuevoPerfil = data.profile;
    setUsuario({ ...data, profile: { ...nuevoPerfil, avatar: nuevaImagen } });
  }

  async function editUser(user) {
    const { data } = await axiosInstance.patch(
      `/users/${usuario.username}/`,
      user
    );
    setUsuario(data);
    setCurrentUser(data.username);
  }

  //manejo de alertas - error y success
  function mostrarAlerta(mensaje, isError) {
    setMensajeAlerta(mensaje);
    setIsErrorMessage(isError);
    setTimeout(function () {
      setMensajeAlerta(null);
    }, 4000);
  }

  function quitarAlerta() {
    setMensajeAlerta(null);
  }

  return (
    <BrowserRouter>
      <Header usuario={usuario} openModal={openModal} />

      <Route
        render={(props) => (
          <Modal {...props} isOpenModal={isOpenModal} closeModal={closeModal} />
        )}
      ></Route>

      <Alerta
        mensajeAlerta={mensajeAlerta}
        quitarAlerta={quitarAlerta}
        isErrorMessage={isErrorMessage}
      />

      {getUsername() ? (
        <LoginRoutes
          usuario={usuario}
          logout={logout}
          editProfile={editProfile}
          editUser={editUser}
          mostrarAlerta={mostrarAlerta}
        />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          mostrarAlerta={mostrarAlerta}
        />
      )}
    </BrowserRouter>
  );
}

function LoginRoutes({
  usuario,
  logout,
  editProfile,
  editUser,
  mostrarAlerta,
}) {
  return (
    <Switch>
      <Route
        path="/accounts/edit"
        render={(props) => (
          <EditProfile
            {...props}
            usuario={usuario}
            editProfile={editProfile}
            editUser={editUser}
            mostrarAlerta={mostrarAlerta}
          />
        )}
      ></Route>
      <Route
        path="/posts/:id"
        render={(props) => <PostDetail {...props} usuario={usuario} />}
      ></Route>
      <Route
        path="/:username"
        render={(props) => (
          <Profile {...props} usuario={usuario} logout={logout} />
        )}
      ></Route>
      <Route
        default
        render={(props) => <Feed {...props} usuario={usuario} />}
      ></Route>
    </Switch>
  );
}

function LogoutRoutes({ login, signup, mostrarAlerta }) {
  return (
    <Switch>
      <Route
        path="/accounts/signup"
        render={(props) => (
          <Signup {...props} signup={signup} mostrarAlerta={mostrarAlerta} />
        )}
      ></Route>
      <Route
        default
        render={(props) => (
          <Login {...props} login={login} mostrarAlerta={mostrarAlerta} />
        )}
      ></Route>
    </Switch>
  );
}
