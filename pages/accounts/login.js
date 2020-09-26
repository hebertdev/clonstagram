import Container from "../../components/container/index";
import Link from "next/link";
import React, { useState } from "react";

export default function Login({ login, mostrarError }) {
  const [email, setEmail] = useState({ email: "", password: "" });

  function handleInputChange(e) {
    setEmail({ ...email, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email.email, email.password);
      location.href = "/";
    } catch (error) {
      mostrarError("Correo o contraseña incorrectos, prueba de nuevo.");
      console.log(error);
    }
  }

  return (
    <Container>
      <div className="ContainerLogin">
        <div className="ContainerLogin__left">
          <img src="../../imagenes/login_image.png" alt="" />
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
              value={email.email}
              onChange={handleInputChange}
            />
            <input
              className="input__password"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={email.password}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn__login">
              Iniciar Sesión
            </button>
            <br />
            <span className="link__login">
              No tienes una cuenta? {""}
              <Link href="/accounts/signup">
                <a className="link-menu">Registráte</a>
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
