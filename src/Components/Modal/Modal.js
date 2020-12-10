import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import axiosInstance from "../../Helpers/axios";

//estilos
import "./Modal.css";

//imagenes
import ImageDefaultPost from "../../Images/iconos/postImage.png";

export default function Modal({ isOpenModal, closeModal, history }) {
  return ReactDOM.createPortal(
    <ModalPost
      isOpenModal={isOpenModal}
      closeModal={closeModal}
      history={history}
    />,
    document.getElementById("modal")
  );
}

function ModalPost({ isOpenModal, closeModal, history }) {
  const [newTitle, setNewTitle] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [enviandoPost, setEnviadoPost] = useState(false);
  let previewImg = useRef(null);
  let inputFile = useRef(null);

  function onChangeFile() {
    let $inputFile = inputFile.current.files[0];
    let $previewImg = previewImg.current;
    let $readFile = new FileReader();

    setNewPhoto($inputFile);

    if ($inputFile) {
      $readFile.readAsDataURL($inputFile);
      $readFile.onloadend = function () {
        $previewImg.src = $readFile.result;
      };
    } else {
      $previewImg.src = ImageDefaultPost;
    }
  }

  async function onSubmitPost() {
    if (enviandoPost) {
      return null;
    }

    try {
      setEnviadoPost(true);
      const newPost = new FormData();
      newPost.append("title", newTitle);
      newPost.append("photo", newPhoto);
      const { data } = await axiosInstance.post("/posts/", newPost);
      console.log(data);
      setEnviadoPost(false);
      setNewTitle("");
      closeModal();
      history.push("/");
    } catch (error) {
      console.log(error);
      setEnviadoPost(false);
    }
  }

  if (!isOpenModal) {
    return null;
  }

  return (
    <div className="Container__upload-form">
      <div className="Upload__form">
        <div className="Upload__form-header">
          <span className="Upload__form-title">Nueva Publicación</span>
          <span className="Upload__form-buton-close" onClick={closeModal}>
            x
          </span>
        </div>
        <div className="Upload__form-container-img">
          <img src={ImageDefaultPost} alt="" ref={previewImg} />
        </div>
        <input
          type="file"
          ref={inputFile}
          className="Upload__form-inputfile"
          name="photo"
          onChange={onChangeFile}
        />
        <div>
          <input
            type="text"
            placeholder="Agrega un mensaje"
            className="Upload__form-inputtext"
            name="title"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
        </div>
        <button
          type="submit"
          className="Upload__form-buttonSubmit"
          onClick={onSubmitPost}
        >
          {enviandoPost ? <small> Publicando ... </small> : <b> Publicar </b>}
        </button>
      </div>
    </div>
  );
}
