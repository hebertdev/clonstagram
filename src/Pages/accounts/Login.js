import React, { useState } from "react";
import { Link } from "react-router-dom";

//estilos
import "./Login.css";

//imagenes
import LoginImage from "../../Images/iconos/login_image.png";

//container
import Container from "../../Components/Container";

export default function Login({ login, mostrarAlerta }) {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(usuario.email, usuario.password);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      mostrarAlerta("Correo o contraseña invalida.", true);
    }
  }

  return (
    <Container>
      <div className="ContainerLogin">
        <div className="ContainerLogin__left">
          <img src={LoginImage} alt="" />
        </div>

        <div className="ContainerLogin__right">
          <form className="ContainerLogin__right-form" onSubmit={handleSubmit}>
            <h1 className="title__center">Iniciar sesión</h1>
            <br />

            <input
              className="input__email"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
              value={usuario.email}
            />

            <input
              className="input__password"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleInputChange}
              value={usuario.password}
            />
            <button type="submit" className="btn__login">
              Iniciar Sesión
            </button>
            <br />
            <span className="link__login">
              No tienes una cuenta?
              <Link to="/accounts/signup" className="link-menu">
                Registráte
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
