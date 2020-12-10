import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
//axios helper
import axiosInstance, { url } from "../Helpers/axios";

//user helper
import { toggleFollow } from "../Helpers/user-helpers";

//estilos
import "./Profile.css";
import "../Styles/style.css";

//imagenes
import iconOff from "../Images/iconos/off-regular.png";
import UserDefault from "../Images/iconos/user-default.jpg";

//componentes loading
import LoadingPage from "../Components/Loading/LoadingPage";
import Error404 from "../Components/Loading/Error404";

export default function Profile({ match, usuario, logout }) {
  const [userProfile, setUserProfile] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(false);
  const [error404, setError404] = useState(false);
  let username = match.params.username;

  useEffect(() => {
    async function getProfile() {
      try {
        setCargandoPerfil(true);
        setError404(false);
        const { data } = await axiosInstance.get(`/users/${username}/`);
        console.log(data);
        setUserProfile(data);
        setCargandoPerfil(false);
      } catch (error) {
        if (error.response.status === 404) {
          setError404(true);
        }

        setCargandoPerfil(false);

        console.log(error);
      }
    }
    getProfile();
  }, [username]);

  return (
    <div className="container-all-profile">
      {cargandoPerfil && <LoadingPage />}

      {error404 && <Error404 />}

      {userProfile && usuario && (
        <>
          <InfoProfile
            userProfile={userProfile}
            usuario={usuario}
            logout={logout}
          />
          <ProfilePosts userProfile={userProfile} />
        </>
      )}
    </div>
  );
}

function InfoProfile({ userProfile, usuario, logout }) {
  let user = userProfile.user;
  let posts = userProfile.posts;
  const [numFollows, setNumFollows] = useState(user.profile.numFollowers);

  async function onSubmitToggleFollow(username) {
    try {
      await toggleFollow(username);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitFollow(isFollowing) {
    if (isFollowing) {
      onSubmitToggleFollow(user.username);
      setNumFollows(numFollows - 1);
    } else {
      onSubmitToggleFollow(user.username);
      setNumFollows(numFollows + 1);
    }
  }

  return (
    <div className="container-info-profile">
      <div className="container-profile-info">
        <div className="sub-container-profile-info">
          <div className="container-img-profile">
            {user.profile.avatar ? (
              <img src={user.profile.avatar} alt="" />
            ) : (
              <img src={UserDefault} alt="" />
            )}
          </div>
          <div className="container-username">
            <p className="txt-username">
              {user.username}

              {usuario.username === userProfile.user.username && (
                <img
                  onClick={logout}
                  src={iconOff}
                  alt=""
                  width={20}
                  style={{ cursor: "pointer", margin: "0 3px" }}
                />
              )}
            </p>
          </div>

          <ButtonFollow
            userProfile={userProfile}
            usuario={usuario}
            onSubmitFollow={onSubmitFollow}
          />

          <div className="section-info-follows">
            <div>
              <span> {posts.length} </span> publicaciones
            </div>
            <div>
              <span> {numFollows} </span> seguidores
            </div>
            <div>
              <span> {user.profile.numFolloweds} </span> seguidos
            </div>
          </div>
          <div className="section-info-name">
            <div>
              <h4 className="txt-name">
                {" "}
                {user.first_name} {user.last_name}{" "}
              </h4>
              <div style={{ marginBottom: "5px" }}>
                <span> {user.profile.bio} </span>
              </div>
              <a
                href={user.profile.link}
                target="blank"
                className="link-website"
              >
                <h4> {user.profile.link} </h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePosts({ userProfile }) {
  let posts = userProfile.posts;
  return (
    <div className="container-all-post" style={{}}>
      <section className="listPost">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

function Post({ post }) {
  let baseUrl = url();
  return (
    <Link to={`/posts/${post.id}`} className="post">
      <div className="post-image">
        <img src={`${baseUrl}${post.photo}`} alt="" />
      </div>
      <div className="overlay">
        <span className="icon-heart"> {post.numLikes} </span>
        <span className="icon-bubble2"> {post.numComments} </span>
      </div>
    </Link>
  );
}

function ButtonFollow({ usuario, userProfile, onSubmitFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let followers = userProfile.user.profile.followers;

    followers.filter(function (userFollow) {
      if (usuario.id === userFollow.id) {
        setIsFollowing(true);
        return setIsFollowing;
      } else {
        return setIsFollowing;
      }
    });
  }, [userProfile.user.profile.followers, usuario.id]);

  function handleClick() {
    if (isFollowing) {
      setIsFollowing(false);
      onSubmitFollow(isFollowing);
    } else {
      setIsFollowing(true);
      onSubmitFollow(isFollowing);
    }
  }

  return (
    <div className="container-editprofile">
      {usuario.username === userProfile.user.username ? (
        <Link to="/accounts/edit/" className="link-txt-edit-profile">
          Editar perfil
        </Link>
      ) : (
        <>
          {isFollowing ? (
            <span className="link-txt-edit-profile" onClick={handleClick}>
              Dejar de seguir
            </span>
          ) : (
            <span
              className="link-txt-edit-profile btn__Follow"
              onClick={handleClick}
            >
              Seguir
            </span>
          )}
        </>
      )}
    </div>
  );
}
