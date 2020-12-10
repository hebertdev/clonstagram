import React from "react";

import "./LoadingPost.css";

export default function LoadingPost() {
  return (
    <article className="allcontainer">
      <div className="background">
        <div className="right">
          <div className="bar" />
          <div className="mask thick" />
        </div>
        <div className="left">
          <div className="image" />
          <div className="mask thick" />
        </div>
        <div className="right">
          <div className="bar" />
          <div className="mask thick" />
          <div className="bar" />
        </div>
      </div>
    </article>
  );
}
