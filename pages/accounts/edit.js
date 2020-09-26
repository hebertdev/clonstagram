import { useState } from "react";
import Container from "../../components/container/index";
import axiosInstance from "../../Helpers/axios";
import { useRouter } from "next/router";

export default function Edit({
  usuario,
  mostrarMensaje,
  mostrarError,
  edit_user,
  edit_profile,
}) {
  const router = useRouter();

  const [newAvatar, setNewAvatar] = useState();

  const [userUpdate, setUserUpdate] = useState({
    ...usuario,
  });

  const [profileUpdate, setProfileUpdate] = useState({
    link: usuario.profile.link,
    bio: usuario.profile.bio,
  });

  function onFileChange(e) {
    setNewAvatar(e.target.files[0]);
  }

  async function handleImagenSeleccionada(e) {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("avatar", newAvatar, newAvatar.name);
      uploadData.append("bio", profileUpdate.bio);
      uploadData.append("link", profileUpdate.link);
      const { data } = await axiosInstance.patch(
        `users/${usuario.username}/profile/`,
        uploadData
      );
      location.href = `/${usuario.username}`;
    } catch (error) {
      mostrarError("Hubo un error al actualizar tus datos");
    }
  }

  function handleInputChangeUser(e) {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  }
  function handleInputChangeProfile(e) {
    setProfileUpdate({ ...profileUpdate, [e.target.name]: e.target.value });
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      await edit_user(userUpdate);
      router.push(`/${userUpdate.username}`);

      mostrarMensaje("Datos actualizados");
    } catch (error) {
      console.log(error);
      mostrarError("Hubo un error al actualizar tus datos");
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
      await edit_profile(profileUpdate);
      location.href = `/${usuario.username}`;

      mostrarMensaje("Biografia actualizada");
    } catch (error) {
      console.log(error);
      mostrarError("Hubo un error al actualizar tus datos");
    }
  }

  return (
    <Container>
      {usuario && (
        <div className="Container__edit_profile">
          <div className="Sub__contianer_edit_profile">
            <div className="container__edit-picture-info">
              <div className="container__edit-picture">
                {usuario.profile.avatar && (
                  <img src={usuario.profile.avatar} alt="" />
                )}
                {!usuario.profile.avatar && (
                  <img src="../imagenes/user-default.jpg" alt="" />
                )}
              </div>

              <div>
                <b>
                  <p> {usuario.username} </p>
                </b>
                <form onSubmit={handleImagenSeleccionada}>
                  <div style={{ position: "relative" }}>
                    <small className="btn-upload-picture-profile">
                      <b>Cambiar foto del perfil</b>
                    </small>

                    <input
                      type="file"
                      className="inputfile__edit_profile"
                      onChange={onFileChange}
                      name="avatar"
                    />
                  </div>
                  <br />
                  <button>actualizar</button>
                </form>
              </div>
            </div>
            <br />
            <br />
            <form className="form__edit-profile" onSubmit={handleUpdateUser}>
              <label>username</label>
              <input
                className="input__edit-profile"
                type="text"
                placeholder="Usuario"
                name="username"
                required
                onChange={handleInputChangeUser}
                value={userUpdate.username}
              />

              <label>First name</label>
              <input
                className="input__edit-profile"
                type="text"
                placeholder="Nombre"
                name="first_name"
                required
                onChange={handleInputChangeUser}
                value={userUpdate.first_name}
              />
              <label>Last name</label>
              <input
                className="input__edit-profile"
                type="text"
                placeholder="Apellido"
                required
                name="last_name"
                onChange={handleInputChangeUser}
                value={userUpdate.last_name}
              />

              <label>Email</label>
              <input
                className="input__edit-profile"
                type="email"
                placeholder="Apellido"
                required
                name="email"
                onChange={handleInputChangeUser}
                value={userUpdate.email}
              />

              <button type="submit" className="btn__submit-update-profile">
                Update user
              </button>
            </form>

            <form className="form__edit-profile" onSubmit={handleUpdateProfile}>
              <label>Biography</label>
              <textarea
                cols={30}
                rows={10}
                className="input__edit-profile textarea_edit_profile"
                name="bio"
                onChange={handleInputChangeProfile}
                value={profileUpdate.bio}
              />

              <label>Web site</label>
              <input
                className="input__edit-profile"
                type="url"
                placeholder="Sitio web"
                name="link"
                onChange={handleInputChangeProfile}
                value={profileUpdate.link}
              />

              <button type="submit" className="btn__submit-update-profile">
                Update Bio
              </button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
}
