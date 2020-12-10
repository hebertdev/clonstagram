import React from "react";

import iconLoading from "../../Images/iconos/loading.gif";

export default function LoadingPage() {
  return (
    <>
      <div className="Loader__page">
        <img src={iconLoading} width="35px" alt="loading" />
      </div>

      <style jsx="true">
        {`
          * {
            margin: 0;
            padding: 0;
          }
          .Loader__page {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            background: white;
            z-index: 1;
          }
        `}
      </style>
    </>
  );
}
