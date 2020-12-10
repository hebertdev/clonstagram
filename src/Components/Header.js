import React from "react";
import { Link } from "react-router-dom";

//Estilos

import "./Header.css";

//Iconos header

import LogoInstagram from "../Images/iconos/logo_image.png";
import CameraRegular from "../Images/iconos/camera-regular.png";
import DirectRegular from "../Images/iconos/direct-regular.png";
import ExploreRegular from "../Images/iconos/explore-regular.png";
import HeartRegular from "../Images/iconos/heart-regular.png";

import UserDefault from "../Images/iconos/user-default.jpg";

export default function Header({ usuario, openModal }) {
  return (
    <>
      <header className="Header__principal">
        <nav className="Header__max-navigation">
          <Link to="/">
            <img src={LogoInstagram} alt="" className="Header__image-logo" />
          </Link>

          {usuario && <NavUser usuario={usuario} openModal={openModal} />}
        </nav>
      </header>
      <div className="Estorbo__header"></div>
    </>
  );
}

function NavUser({ usuario, openModal }) {
  let profile = usuario.profile;

  return (
    <div className="Header__navigation-link">
      <Link
        to={`/${usuario.username}`}
        onClick={openModal}
        className="Header__navigation-link-icons iconos__hiden-mobil"
      >
        <img src={CameraRegular} alt="" />
      </Link>
      <Link to="/" className="Header__navigation-link-icons">
        <img src={DirectRegular} alt="" />
      </Link>
      <Link
        to="/"
        className="Header__navigation-link-icons iconos__hiden-mobil"
      >
        <img src={ExploreRegular} alt="" />
      </Link>
      <Link
        to="/"
        className="Header__navigation-link-icons iconos__hiden-mobil"
      >
        <img src={HeartRegular} alt="" />
      </Link>
      <Link
        to={`/${usuario.username}`}
        className="Header__navigation-link-icons iconos__hiden-mobil"
      >
        <div className="Header__navigation-image-user">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" />
          ) : (
            <img src={UserDefault} alt="" />
          )}
        </div>
      </Link>
    </div>
  );
}
