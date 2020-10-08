import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function FooterNavigation({ usuario, OpenModalUpload }) {
  const router = useRouter();

  return (
    <div className="Container__feed-footer-navigation">
      <div className="Container-feed-footer-navigation-max">
        {router.pathname === "/" ? (
          <Link href="/">
            <a>
              <img src="../imagenes/home-solid.png" alt="" />
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a>
              <img src="../imagenes/home-regular.png" alt="" />
            </a>
          </Link>
        )}

        {router.pathname === "/accounts/explore" ? (
          <Link href="/accounts/explore">
            <a>
              <img src="../imagenes/search-solid.png" alt="" />
            </a>
          </Link>
        ) : (
          <Link href="/accounts/explore">
            <a>
              <img src="../imagenes/search-regular.png" alt="" />
            </a>
          </Link>
        )}

        <a onClick={OpenModalUpload}>
          <img src="../imagenes/add-regular.png" alt="" />
        </a>
        <a>
          <img src="../imagenes/heart-regular.png" alt="" />
        </a>

        <Link href={`/${usuario.username}`}>
          <a className="Header__navigation-link-icons">
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
    </div>
  );
}
