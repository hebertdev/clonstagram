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
      mostrarError("Hubo un error al registrarse. Verifica tus datos.");
      console.log(error.response.data);
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
              Iniciar Sesión
            </button>
            <br />
            <span className="link__login">
              Ya tienes una cuenta? {""}
              <Link href="/accounts/login">
                <a className="link-menu">Inicia sesión</a>
              </Link>
            </span>
            <br />
            <br />
          </form>
        </div>
      </div>
      <style jsx>{`
        .link-menu {
          color: rgb(0, 149, 246);
          text-decoration: underline;
        }
        .title__center {
          text-align: center;
        }
        .ContainerLogin {
          display: flex;
          width: 100%;
          align-items: center;
        }
        .ContainerLogin__left {
          width: 45%;
        }
        .ContainerLogin__right {
          width: 45%;
        }
        .ContainerLogin__right-form {
          width: 90%;
          margin: auto;
          background: white;
          padding: 10px;
          border: 1px solid rgba(0, 0, 0, 0.09);
          box-sizing: border-box;
        }

        .input__email {
          display: block;
          width: 80%;
          margin: auto;
          margin-bottom: 10px;
          padding: 5px;
          border: 1px solid rgba(0, 0, 0, 0.09);
          background: #fafafa;
          border-radius: 3px;
        }
        .input__password {
          display: block;
          width: 80%;
          margin: auto;
          padding: 5px;
          border: 1px solid rgba(0, 0, 0, 0.09);
          margin-bottom: 10px;
          background: #fafafa;
          border-radius: 3px;
        }
        .btn__login {
          display: block;
          width: 83%;
          margin: auto;
          padding: 5px;
          border: 1px solid rgba(0, 0, 0, 0.09);
          background: #0095f6;
          border-radius: 3px;
          color: white;
          cursor: pointer;
        }
        input:focus {
          outline: none;
        }
        button:focus {
          outline: none;
        }

        .link__login {
          display: block;
          text-align: center;
        }
        @media screen and (max-width: 768px) {
          .container__image {
            display: none;
          }
          .container__form {
            width: 100% !important;
            margin-top: 70px;
          }
        }
      `}</style>
    </Container>
  );
}
