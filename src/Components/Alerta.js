import React from "react";

//estilos
import "./Alerta.css";

export default function Alerta({
  mensajeAlerta,
  quitarAlerta,
  isErrorMessage,
}) {
  if (!mensajeAlerta) {
    return null;
  }

  let estiloAlert = `${
    isErrorMessage ? "Container-alert-error" : "Container-alert-success"
  }`;

  return (
    <div className={estiloAlert}>
      {mensajeAlerta}
      <span className="close_alert_error" onClick={quitarAlerta}>
        x
      </span>
    </div>
  );
}
