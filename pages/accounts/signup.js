import { useState } from "react";
import Router from "next/router";

import Container from "../../components/container/index";
import Link from "next/link";

export default function Signup({ signup, mostrarError, mostrarMensaje }) {
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  const [errores, setErrores] = useState([]);

  function handleInputChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(usuario);
      Router.push("/accounts/login");
      mostrarMensaje("Registro completado. Ya puedes Iniciar sesión");
    } catch (error) {
      console.log(error.response.data);
      setErrores(error.response.data);
      console.log(errores);
    }
  }

  return (
    <Container>
      {errores && (
        <div
          style={{
            background: "#dc3545",
            color: "white",
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          {errores && (
            <div>{JSON.stringify(errores)} "-----la flojera xd."</div>
          )}
        </div>
      )}
      <div className="ContainerLogin">
        <div className="ContainerLogin__left">
          <img src="../../imagenes/login_image.png" alt="" />
        </div>
        <div className="ContainerLogin__right">
          <form className="ContainerLogin__right-form" onSubmit={handleSubmit}>
            <h1 className="title__center">Crea una cuenta</h1>
            <br />

            <input
              className="input__email"
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={handleInputChange}
              value={usuario.email}
            />
            <input
              className="input__email"
              type="text"
              placeholder="username"
              required
              name="username"
              onChange={handleInputChange}
              value={usuario.username}
            />
            <input
              className="input__email"
              type="text"
              placeholder="First Name"
              required
              name="first_name"
              onChange={handleInputChange}
              value={usuario.first_name}
            />
            <input
              className="input__email"
              type="text"
              placeholder="Last Name"
              required
              name="last_name"
              onChange={handleInputChange}
              value={usuario.last_name}
            />
            <input
              className="input__email"
              type="password"
              placeholder="password"
              required
              name="password"
              onChange={handleInputChange}
              value={usuario.password}
            />
            <input
              className="input__email"
              type="password"
              placeholder="password"
              required
              name="password_confirmation"
              onChange={handleInputChange}
              value={usuario.password_confirmation}
            />

            <button type="submit" className="btn__login">
              Crear cuenta
            </button>
            <br />
            <span className="link__login">
              Ya tienes una cuenta? {""}
              <Link href="/accounts/login">
                <a className="link-menu">Iniciar Sesión</a>
              </Link>
            </span>
            <br />
            <br />
          </form>
        </div>
      </div>
    </Container>
  );
}
