import React, { useState } from "react";

//estilos
import "./EditProfile.css";

//imagenes
import userDefault from "../../Images/iconos/user-default.jpg";
import iconLoading from "../../Images/iconos/loading.gif";

export default function EditProfile({
  usuario,
  editProfile,
  editUser,
  mostrarAlerta,
}) {
  return (
    <>
      {usuario && (
        <div className="Container__edit_profile">
          <div className="Sub__contianer_edit_profile">
            <EditPicture
              usuario={usuario}
              editProfile={editProfile}
              mostrarAlerta={mostrarAlerta}
            />
            <EditUser
              usuario={usuario}
              editUser={editUser}
              mostrarAlerta={mostrarAlerta}
            />
            <EditUserProfile
              usuario={usuario}
              editProfile={editProfile}
              mostrarAlerta={mostrarAlerta}
            />
          </div>
        </div>
      )}
    </>
  );
}

function EditPicture({ usuario, editProfile, mostrarAlerta }) {
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  async function onChangeFile(e) {
    try {
      setSubiendoImagen(true);
      const file = e.target.files[0];
      const imageForm = new FormData();
      imageForm.append("avatar", file);
      await editProfile(imageForm);
      setSubiendoImagen(false);
      mostrarAlerta("foto actualizada", false);
    } catch (error) {
      console.log(error);
      setSubiendoImagen(false);
      mostrarAlerta("Ups. ocurrio un error intente de nuevo.", true);
    }
  }

  return (
    <div className="container__edit-picture-info">
      <div className="container__edit-picture">
        {usuario.profile.avatar ? (
          <img src={usuario.profile.avatar} alt="" />
        ) : (
          <img src={userDefault} alt="" />
        )}
      </div>
      <div>
        <b>
          <p> {usuario.username} </p>
        </b>
        <form>
          <div style={{ position: "relative" }}>
            <small className="btn-upload-picture-profile">
              <b>Cambiar foto del perfil</b>
            </small>
            <input
              type="file"
              className="inputfile__edit_profile"
              name="avatar"
              onChange={onChangeFile}
            />
          </div>
        </form>
      </div>
      {subiendoImagen && (
        <img src={iconLoading} alt="" style={{ marginLeft: "10px" }} />
      )}
    </div>
  );
}

function EditUser({ usuario, editUser, mostrarAlerta }) {
  const [user, setUser] = useState(usuario);

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function onSubmitUser(e) {
    e.preventDefault();
    try {
      await editUser(user);
      mostrarAlerta("Datos actualizados. 😉", false);
    } catch (error) {
      console.log(error);
      mostrarAlerta("Ups.. hubo un error al actualizar tus datos. 😯", true);
    }
  }

  return (
    <form className="form__edit-profile" onSubmit={onSubmitUser}>
      <label>username</label>
      <input
        className="input__edit-profile"
        type="text"
        placeholder="Usuario"
        name="username"
        required
        onChange={handleInputChange}
        value={user.username}
      />
      <label>First name</label>
      <input
        className="input__edit-profile"
        type="text"
        placeholder="Nombre"
        name="first_name"
        required
        onChange={handleInputChange}
        value={user.first_name}
      />
      <label>Last name</label>
      <input
        className="input__edit-profile"
        type="text"
        placeholder="Apellido"
        required
        name="last_name"
        onChange={handleInputChange}
        value={user.last_name}
      />
      <label>Email</label>
      <input
        className="input__edit-profile"
        type="email"
        placeholder="email"
        required
        name="email"
        onChange={handleInputChange}
        value={user.email}
      />
      <button type="submit" className="btn__submit-update-profile">
        Update user
      </button>
    </form>
  );
}

function EditUserProfile({ usuario, editProfile, mostrarAlerta }) {
  const [profile, setProfile] = useState({
    bio: usuario.profile.bio,
    link: usuario.profile.link,
  });

  function handleInputChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function onSubmitProfile(e) {
    e.preventDefault();
    try {
      await editProfile(profile);
      mostrarAlerta("Datos actualizados. 😉", false);
    } catch (error) {
      console.log(error);
      mostrarAlerta("Ups. ocurrio un error al actualizar tus datos. 😯", true);
    }
  }

  return (
    <form className="form__edit-profile" onSubmit={onSubmitProfile}>
      <label>Biography</label>
      <textarea
        className="input__edit-profile textarea_edit_profile"
        name="bio"
        placeholder="biografia"
        onChange={handleInputChange}
        value={profile.bio}
      />
      <label>Web site</label>
      <input
        className="input__edit-profile"
        type="url"
        placeholder="Sitio web"
        name="link"
        onChange={handleInputChange}
        value={profile.link}
      />
      <button type="submit" className="btn__submit-update-profile">
        Update Bio
      </button>
    </form>
  );
}
