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
import { getTokenCookie, parseCookies } from "../Helpers/auth-helpers";
import cookies from "next-cookies";

import LoaderGeneral from "../components/LoaderGeneral";

async function CargarProfile() {
  var rutaObtenida = window.location.href;
  let paths = rutaObtenida.split("/");
  let larutaes = paths[paths.length - 1];

  const { data: profile } = await axiosInstance.get(`/users/${larutaes}/`);
  return profile;
}

export default function User({ usuario, logout, match }) {
  const router = useRouter();
  const { username } = router.query;
  const [userProfile, setUserProfile] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  useEffect(() => {
    async function CargarPostsYUsuario() {
      try {
        const profile = await CargarProfile();
        setUserProfile(profile);
        setCargandoPerfil(false);
      } catch (error) {
        console.log(error);

        setCargandoPerfil(false);
      }
    }

    CargarPostsYUsuario();
  }, [username]);

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
      {cargandoPerfil == true && <LoaderGeneral></LoaderGeneral>}

      <div className="container-all-profile">
        {/* parte de la informacion de perfil */}

        {usuario && userProfile && (
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

function ProfileSectionBio({
  userProfile,
  usuario,
  logout,
  onSubmitFollowToggle,
  seguidores,
}) {
  const [isFollow, setIsFollow] = useState(false);
  const [numFollows, setNumFollow] = useState(
    userProfile.user.profile.numFollowers
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  function OpenModalFollowers() {
    setModalIsOpen(true);
  }

  function CloseModalFollower() {
    setModalIsOpen(false);
  }

  function Logout() {
    logout();
  }
  return (
    <div className="container-info-profile">
      {modalIsOpen == true && (
        <>
          {usuario && userProfile && (
            <ModalFollowers
              userProfile={userProfile}
              usuario={usuario}
              CloseModalFollower={CloseModalFollower}
            ></ModalFollowers>
          )}
        </>
      )}

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
                  <span
                    className="span__followers_user"
                    onClick={OpenModalFollowers}
                  >
                    {" "}
                    seguidores
                  </span>
                </div>
              ) : (
                <div>
                  {numFollows}{" "}
                  <span
                    onClick={OpenModalFollowers}
                    className="span__followers_user"
                  >
                    {" "}
                    seguidores
                  </span>
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

function ModalFollowers({ userProfile, usuario, CloseModalFollower }) {
  let followersProfile = userProfile.user.profile.followers;

  return (
    <div className="modal_followers_profile">
      <div className="modal_follower-container">
        <div className="modal_header-followers">
          <span className="title-header-follower-modal">Seguidores</span>{" "}
          <span className="CloseModalFollower-btn" onClick={CloseModalFollower}>
            X
          </span>
        </div>

        {usuario && userProfile && (
          <ul className="Container-follower-list">
            {userProfile.user.profile.followers.map((seguidor) => (
              <li key={seguidor.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>
                      <Link href={`/${seguidor.username}`}>
                        <a style={{ color: "#585858", textDecoration: "none" }}>
                          {seguidor.username}
                        </a>
                      </Link>
                    </span>{" "}
                    <br />
                    <span>
                      <small style={{ color: "#666" }}>
                        {" "}
                        {seguidor.first_name} {seguidor.last_name}
                      </small>
                    </span>
                  </div>
                </div>
                {usuario.id == seguidor.id && (
                  <Link href="/accounts/edit">
                    <a className="btn-seguir-users">Editar perfil</a>
                  </Link>
                )}

                {usuario.id !== seguidor.id && (
                  <Link href={`/${seguidor.username}`}>
                    <a className="btn-seguir-users">Ver perfil</a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
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
