import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export default function Error({ success_message, esconderError }) {
  if (!success_message) {
    return null;
  }

  return (
    <div className="ErrorContainer" role="alert">
      <div className="Error__inner">
        <span className="block"> {success_message} </span>
        <button className="Error__button" onClick={esconderError}>
          <b>x</b>
        </button>
      </div>

      <style jsx>
        {`
          .ErrorContainer {
            border-width: 1px;
            position: fixed;
            z-index: 50;
            background-color: #fcebea;
            border-color: #ef5753;
            margin-top: 4rem;
            width: 100%;
            color: #cc1f1a;
            border-radius: 0.25rem;
            max-width: 950px;
            left: 0;
            right: 0;
            margin: auto;
            border: 1px solid #28a745;
            background: #28a745;
            color: white;
          }
          .Error__inner {
            -webkit-align-items: center;
            align-items: center;
            padding: 0.5rem;
            width: 100%;
            max-width: 50rem;
            margin-right: auto;
            left: 50%;
          }
          .Error__button,
          .Error__inner {
            display: -webkit-flex;
            display: flex;
            margin-left: auto;
          }
          .Error__button {
            padding-left: 1rem;
            padding-right: 1rem;
            background: #28a745;
            border: none;
            color: white;
            cursor: pointer;
          }

          .Error__button:focus {
            outline: none;
          }

          .Error__icon {
            color: #e3342f;
          }
          .Error__icon:hover {
            color: #cc1f1a;
          }
          .RecursoNoExiste__mensaje {
            text-align: center;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .RecursoNoExiste__link-container {
            text-align: center;
            margin-top: 1rem;
          }
        `}
      </style>
    </div>
  );
}
