import React from "react";

export default function Container({ children }) {
  return (
    <div style={{ maxWidth: "950px", width: "95%", margin: "auto" }}>
      {children}
    </div>
  );
}
