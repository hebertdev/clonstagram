import { useState } from "react";
import axiosInstance from "../../Helpers/axios";
import { useRouter } from "next/router";

export default function UploadImage({ CloseModalUpload }) {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState("");
  const [newPhoto, setNewPhoto] = useState();

  function onFileChange(e) {
    setNewPhoto(e.target.files[0]);

    let inputfile = document.getElementById("fileimg").files[0];
    let imgpreview = document.querySelector("img[id=previewimage]");
    let $readfile = new FileReader();

    if (inputfile) {
      $readfile.readAsDataURL(inputfile);
      $readfile.onloadend = function () {
        imgpreview.src = $readfile.result;
      };
    } else {
      imgpreview.src = "";
    }
  }

  async function handleImagenSeleccionada(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("photo", newPhoto, newPhoto.name);
      uploadData.append("title", newTitle);
      const { data } = await axiosInstance.post("posts/", uploadData);
      setNewTitle("");
      setNewPhoto(null);
      let imgpreview = document.querySelector("img[id=previewimage]");
      imgpreview.src = "";
      CloseModalUpload();

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Container__upload-form">
      <div className="Upload__form">
        <div className="Upload__form-header">
          <span className="Upload__form-title">Nueva Publicación</span>
          <span className="Upload__form-buton-close" onClick={CloseModalUpload}>
            x
          </span>
        </div>
        <div className="Upload__form-container-img">
          <img src="../imagenes/postImage.png" alt="" id="previewimage" />
        </div>
        <input
          type="file"
          id="fileimg"
          className="Upload__form-inputfile"
          onChange={onFileChange}
          name="photo"
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
          onClick={handleImagenSeleccionada}
        >
          <b> Publicar </b>
        </button>
      </div>
    </div>
  );
}
