import React, { useState } from "react";
import { Link } from "react-router-dom";

//estilos
import "./Login.css";

//imagenes
import LoginImage from "../../Images/iconos/login_image.png";

//container
import Container from "../../Components/Container";

export default function Signup({ signup, mostrarAlerta, history }) {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  function handleInputChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(newUser);
      mostrarAlerta("Cuenta creada , ya puede iniciar sesión", false);
      history.push("/accounts/login");
    } catch (error) {
      console.log(error.response.data);
      mostrarAlerta(
        "Hubo un problema al registrarse , intente de nuevo.",
        true
      );
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
            <h1 className="title__center">Crea una cuenta</h1>
            <br />
            <input
              className="input__email"
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={handleInputChange}
            />
            <input
              className="input__email"
              type="text"
              placeholder="username"
              required
              name="username"
              onChange={handleInputChange}
            />
            <input
              className="input__email"
              type="text"
              placeholder="First Name"
              required
              name="first_name"
              onChange={handleInputChange}
            />
            <input
              className="input__email"
              type="text"
              placeholder="Last Name"
              required
              name="last_name"
              onChange={handleInputChange}
            />
            <input
              className="input__email"
              type="password"
              placeholder="password"
              required
              name="password"
              onChange={handleInputChange}
            />
            <input
              className="input__email"
              type="password"
              placeholder="password"
              required
              name="password_confirmation"
              onChange={handleInputChange}
            />
            <button type="submit" className="btn__login">
              Crear cuenta
            </button>
            <br />
            <span className="link__login">
              ya tienes una cuenta?
              <Link to="/accounts/login" className="link-menu">
                Inicia sesión
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
