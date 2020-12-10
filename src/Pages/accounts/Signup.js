import React, { useState } from "react";
import { Link } from "react-router-dom";

//estilos
import "./Login.css";

//imagenes
import LoginImage from "../../Images/iconos/login_image.png";

//container
import Container from "../../Components/Container";

export default function Signup({ signup, mostrarAlerta, history }) {
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [lastnameError, setLastnameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfError, setPasswordConfError] = useState(null);
  const [nonFieldsError, setNonFieldsError] = useState(null);

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
      mostrarAlerta("Hubo un problema al registrarse intente de nuevo.", true);
      console.log(error.response.data.email);
      setEmailError(error.response.data.email);
      setUsernameError(error.response.data.username);
      setNameError(error.response.data.first_name);
      setLastnameError(error.response.data.last_name);
      setPasswordError(error.response.data.password);
      setPasswordConfError(error.response.data.password_confirmation);
      setNonFieldsError(error.response.data.non_field_errors);
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
            {emailError && (
              <small className="error__input"> {emailError} </small>
            )}
            <input
              className={`${
                emailError ? "input__email input_error" : "input__email"
              }`}
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={handleInputChange}
              value={newUser.email}
            />

            {usernameError && (
              <small className="error__input"> {usernameError} </small>
            )}
            <input
              className={`${
                usernameError ? "input__email input_error" : "input__email"
              }`}
              type="text"
              placeholder="username"
              required
              name="username"
              onChange={handleInputChange}
              value={newUser.username}
            />

            {nameError && <small className="error__input"> {nameError} </small>}
            <input
              className={`${
                nameError ? "input__email input_error" : "input__email"
              }`}
              type="text"
              placeholder="First Name"
              required
              name="first_name"
              onChange={handleInputChange}
              value={newUser.first_name}
            />

            {lastnameError && (
              <small className="error__input"> {lastnameError} </small>
            )}
            <input
              className={`${
                lastnameError ? "input__email input_error" : "input__email"
              }`}
              type="text"
              placeholder="Last Name"
              required
              name="last_name"
              onChange={handleInputChange}
              value={newUser.last_name}
            />

            {passwordError && (
              <small className="error__input"> {passwordError} </small>
            )}
            <input
              className={`${
                passwordError ? "input__email input_error" : "input__email"
              }`}
              type="password"
              placeholder="password"
              required
              name="password"
              onChange={handleInputChange}
              value={newUser.password}
            />

            {passwordConfError && (
              <small className="error__input"> {passwordConfError} </small>
            )}
            {nonFieldsError && (
              <small className="error__input"> {nonFieldsError} </small>
            )}
            <input
              className={`${
                passwordConfError || nonFieldsError
                  ? "input__email input_error"
                  : "input__email"
              }`}
              type="password"
              placeholder="password"
              required
              name="password_confirmation"
              onChange={handleInputChange}
              value={newUser.password_confirmation}
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
