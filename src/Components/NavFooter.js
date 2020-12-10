import React from "react";

import { Link } from "react-router-dom";

import "./NavFooter.css";

//Iconos header

import HomeRegular from "../Images/iconos/home-regular.png";
import AddRegular from "../Images/iconos/add-regular.png";

import UserDefault from "../Images/iconos/user-default.jpg";

export default function FooterNavigation({ usuario, openModal }) {
  return (
    <div className="Container__feed-footer-navigation">
      <div className="Container-feed-footer-navigation-max">
        <Link to="/">
          <img src={HomeRegular} alt="" />
        </Link>

        {usuario ? (
          <Link to={`/${usuario.username}`} onClick={openModal}>
            <img src={AddRegular} alt="" />
          </Link>
        ) : (
          <Link to="/">
            <img src={AddRegular} alt="" />
          </Link>
        )}

        <span className="Header__navigation-link-icons">
          <div className="Header__navigation-image-user">
            {usuario && (
              <>
                {usuario.profile.avatar ? (
                  <Link to={`/${usuario.username}`}>
                    <img src={usuario.profile.avatar} alt="" />
                  </Link>
                ) : (
                  <Link to={`/${usuario.username}`}>
                    <img src={UserDefault} alt="" />
                  </Link>
                )}
              </>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}
