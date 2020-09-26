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
