import React from "react";
import Link from "next/link";
import Head from "next/head";
import { deleteToken } from "../../Helpers/auth-helpers";

export default function Nav({ usuario, logout, OpenModalUpload }) {
  return (
    <header className="Header__principal">
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <nav className="Header__max-navigation">
        <Link href="/">
          <a>
            <img
              src="../imagenes/logo_image.png"
              alt=""
              className="Header__image-logo"
            />
          </a>
        </Link>

        {usuario && (
          <NavLinkUser
            usuario={usuario}
            OpenModalUpload={OpenModalUpload}
          ></NavLinkUser>
        )}
      </nav>
    </header>
  );
}

function NavLinkUser({ usuario, OpenModalUpload }) {
  return (
    <div className="Header__navigation-link">
      <a
        onClick={OpenModalUpload}
        className="Header__navigation-link-icons iconos__hiden-mobil"
      >
        <img src="../imagenes/camera-regular.png" alt="" />
      </a>
      <a className="Header__navigation-link-icons">
        <img src="../imagenes/direct-regular.png" alt="" />
      </a>
      <a className="Header__navigation-link-icons iconos__hiden-mobil">
        <img src="../imagenes/explore-regular.png" alt="" />
      </a>
      <Link href={`/${usuario.username}`}>
        <a className="Header__navigation-link-icons iconos__hiden-mobil">
          <div className="Header__navigation-image-user">
            {usuario.profile.avatar && (
              <img src={usuario.profile.avatar} alt="" />
            )}
            {!usuario.profile.avatar && (
              <img src="../imagenes/user-default.jpg" alt="" />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}
