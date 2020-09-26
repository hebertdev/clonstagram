export default function LoaderUserFeed() {
  return (
    <article className="allcontainer2">
      <div className="profile_before_background"></div>
      <div style={{ width: "100%" }}>
        <div className="background2 " style={{ marginBottom: "10px" }}></div>
        <div className="background2"></div>
      </div>

      <style jsx>
        {`
          .allcontainer2 {
            border-radius: 5px;
            max-width: 769px;
            padding: 4px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            margin-bottom: 3px;
          }
          .background2 {
            animation-duration: 2s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: preloadAnimationuser;
            animation-timing-function: linear;
            background: #f6f7f8;
            background: linear-gradient(
              to right,
              #eeeeee 8%,
              #dddddd 18%,
              #eeeeee 33%
            );
            display: block;
            min-height: 7px;
            width: 80%;
          }

          .profile_before_background {
            min-width: 30px;
            min-height: 30px;
            border-radius: 100%;
            animation-duration: 2s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: preloadAnimationuser;
            animation-timing-function: linear;
            background: #dee1e4;

            margin-right: 6px;
          }

          @keyframes preloadAnimationuser {
            0% {
              background-position: 1px 0;
            }
            100% {
              background-position: 769px 0;
            }
          }
        `}
      </style>
    </article>
  );
}
