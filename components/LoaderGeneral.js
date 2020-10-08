export default function LoaderGeneral() {
  return (
    <div className="preloader" id="preloader">
      <div id="contenedor_carga">
        <div>
          <div id="cargapreloader" />
          <br />
          <br />
          <br />
        </div>
      </div>

      <style jsx>
        {`
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            z-index: 1;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }

          #contenedor_carga {
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          #cargapreloader {
            border: 5px solid rgba(0, 0, 0, 0.2);
            border-top-color: rgba(0, 0, 0, 0.6);
            border-top-style: groove;
            height: 50px;
            width: 50px;
            border-radius: 100%;
            animation: girar 1.5s linear infinite;
            margin: 5px 0;
          }

          @keyframes girar {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
