import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "../components/container/index";
import axiosInstance from "../Helpers/axios";
import { exportBASEurl } from "../Helpers/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { toggleFollow } from "../Helpers/user-helpers";

export default function User(props, { usuario, logout }) {
  const router = useRouter();
  const { username } = router.query;

  console.log(props.user.username);

  const [userProfile, setUserProfile] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  useEffect(() => {
    async function CargarPostsYUsuario() {
      try {
        setCargandoPerfil(true);
        const { data: profile } = await axiosInstance.get(
          `/users/${props.user.username}/`
        );

        setUserProfile(profile);
        setCargandoPerfil(false);
      } catch (error) {
        console.log(error);

        setCargandoPerfil(false);
      }
    }

    CargarPostsYUsuario();
  }, [props.user.username]);

  async function onSubmitFollowToggle() {
    try {
      const userActualizado = await toggleFollow(userProfile);
    } catch (error) {
      console.log(error);
      console.log(
        "Hubo un error al seguir o dejar de seguir intentelo de nuevo"
      );
    }
  }

  return (
    <Container>
      <div className="container-all-profile">
        {/* parte de la informacion de perfil */}

        {userProfile && (
          <ProfileSectionBio
            userProfile={userProfile}
            usuario={usuario}
            logout={logout}
            onSubmitFollowToggle={onSubmitFollowToggle}
          ></ProfileSectionBio>
        )}

        {userProfile && (
          <SectionPostProfile
            userProfile={userProfile}
            onSubmitFollowToggle={onSubmitFollowToggle}
          ></SectionPostProfile>
        )}
        <div style={{ height: "55px" }}></div>
      </div>
    </Container>
  );
}

User.getInitialProps = async (ctx) => {
  let usernamesito = {
    username: ctx.query.username,
  };

  return { user: usernamesito };
};

function ProfileSectionBio({
  userProfile,
  usuario,
  logout,
  onSubmitFollowToggle,
}) {
  const [isFollow, setIsFollow] = useState(false);
  const [numFollows, setNumFollow] = useState(
    userProfile.user.profile.numFollowers
  );
  useEffect(() => {
    const userFollow = userProfile.user.profile.followers.filter(function (
      user
    ) {
      if (user.id == usuario.id) {
        setIsFollow(true);
      }
    });
  }, []);

  function onSubmitFollow() {
    if (isFollow) {
      setIsFollow(false);
      onSubmitFollowToggle();
      setNumFollow(numFollows - 1);
    } else {
      setIsFollow(true);
      onSubmitFollowToggle();
      setNumFollow(numFollows + 1);
    }
  }

  function Logout() {
    logout();
  }
  return (
    <div className="container-info-profile">
      {usuario && userProfile && (
        <div className="container-profile-info">
          <div className="sub-container-profile-info">
            <div className="container-img-profile">
              {userProfile.user.profile.avatar && (
                <img src={userProfile.user.profile.avatar} alt="" />
              )}
              {!userProfile.user.profile.avatar && (
                <img src="../imagenes/user-default.jpg" alt="" />
              )}
            </div>
            <div className="container-username">
              <p className="txt-username">
                {" "}
                {userProfile.user.username}{" "}
                {usuario.username === userProfile.user.username && (
                  <img
                    src="../imagenes/off-regular.png"
                    alt=""
                    width="20"
                    style={{ cursor: "pointer", margin: "0 3px" }}
                    onClick={Logout}
                  />
                )}
              </p>
            </div>
            {usuario && userProfile && (
              <Buttonfollow
                usuario={usuario}
                userProfile={userProfile}
                isFollow={isFollow}
                onSubmitFollowToggle={onSubmitFollowToggle}
                onSubmitFollow={onSubmitFollow}
              ></Buttonfollow>
            )}
            <div className="container-buttonconfig">
              <span
                className="icon-cog"
                id="btnconfig"
                style={{
                  color: "rgba(0, 0, 0, 0.62)",
                  margin: "0 10px",
                  lineHeight: "20px",
                }}
              />
            </div>
            <div className="section-info-follows">
              <div>
                <span> {userProfile.posts.length} </span> publicaciones
              </div>

              {usuario.username === userProfile.user.username ? (
                <div>
                  {userProfile.user.profile.numFollowers}{" "}
                  <span className="span__followers_user"> seguidores</span>
                </div>
              ) : (
                <div>
                  {numFollows}{" "}
                  <span className="span__followers_user"> seguidores</span>
                </div>
              )}

              <div>
                <span> {userProfile.user.profile.numFolloweds} </span> seguidos
              </div>
            </div>
            <div className="section-info-name">
              <div>
                <h4 className="txt-name">
                  {" "}
                  {userProfile.user.first_name} {userProfile.user.last_name}{" "}
                </h4>
                <div style={{ marginBottom: "5px" }}>
                  <span>{userProfile.user.profile.bio}</span>
                </div>
                <a
                  href={userProfile.user.profile.link}
                  target="blank"
                  className="link-website"
                >
                  <h4> {userProfile.user.profile.link} </h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionPostProfile({ userProfile }) {
  let postProfile = userProfile.posts;
  let baseURL = exportBASEurl();

  return (
    <div className="container-all-post">
      <section className="listPost">
        {postProfile.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="post">
              <div className="post-image">
                <img src={`${baseURL}${post.photo}`} alt="" />
              </div>
              <div className="overlay">
                <span className="icon-bubble2 iconoLikes">
                  <div className="fontIcons">
                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                  </div>
                  {post.numLikes}
                </span>

                <span className="icon-bubble2 iconoLikes">
                  <div className="fontIcons">
                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                  </div>
                  {post.numComments}
                </span>
              </div>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
}

function Buttonfollow({ usuario, userProfile, onSubmitFollow, isFollow }) {
  return (
    <div className="container-editprofile">
      {usuario && userProfile && (
        <div>
          {usuario.username === userProfile.user.username ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "125px",
              }}
            >
              <Link href="/accounts/edit">
                <a className="link-txt-edit-profile">Editar perfil</a>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "125px",
              }}
            >
              {isFollow == false ? (
                <a
                  className="link-txt-edit-profile btn__Follow"
                  onClick={onSubmitFollow}
                >
                  Seguir
                </a>
              ) : (
                <a className="link-txt-edit-profile" onClick={onSubmitFollow}>
                  Dejar de seguir
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
