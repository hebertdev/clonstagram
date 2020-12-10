import React from "react";

import { Link } from "react-router-dom";

import "./Error404.css";

export default function Error404() {
  return (
    <div className="container__page404">
      <h2 className="title__404">Esta página no está disponible.</h2>
      <p>
        Es posible que el enlace que seleccionaste esté dañado o que se haya
        eliminado la página.
      </p>
      <br />
      <Link to="/" className="link__404">
        Volver a clonstagram
      </Link>
    </div>
  );
}
