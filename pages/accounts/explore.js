import Container from "../../components/container/index";
import { useEffect, useState } from "react";
import axiosInstance from "../../Helpers/axios";
import User from "../[username]";
import Link from "next/link";
import LoaderGeneral from "../../components/LoaderGeneral";

export default function Explore({ usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [nextload, setNextLoad] = useState();

  useEffect(() => {
    async function obtenerUsuarios() {
      try {
        setCargandoUsuarios(true);
        const { data: usuarios } = await axiosInstance.get("users/");
        setUsuarios(usuarios.results);
        setCargandoUsuarios(false);
        setNextLoad(usuarios.next);
        console.log(usuarios);
      } catch (error) {
        console.log("Hubo un error al cargar tu usuarios");
        console.log(error);
        setCargandoUsuarios(false);
      }
    }

    obtenerUsuarios();
  }, []);

  async function CargarMasPerfiles() {
    try {
      setCargandoUsuarios(true);
      const { data: nuevosPerfiles } = await axiosInstance.get(`${nextload}`);

      let nuevosPerfilesCargados = nuevosPerfiles.results;

      setNextLoad(nuevosPerfiles.next);

      setCargandoUsuarios(false);
      setUsuarios((viejosPerfiles) => [
        ...viejosPerfiles,
        ...nuevosPerfilesCargados,
      ]);
    } catch (error) {
      console.log(error);
      setCargandoUsuarios(false);
    }
  }

  return (
    <Container>
      {cargandoUsuarios == true && <LoaderGeneral></LoaderGeneral>}

      <div className="container-all-profile">
        <h2>Explorar usuarios</h2>
        {usuario && <Users usuarios={usuarios}></Users>}

        {nextload && (
          <button
            className="btn__feed-cargarmasposts"
            onClick={CargarMasPerfiles}
          >
            Explorar más
          </button>
        )}

        <br />
      </div>
    </Container>
  );
}

function Users({ usuarios }) {
  return (
    <div className="container-all-post">
      <section className="listPost">
        {usuarios.map((usuario) => (
          <Link key={usuario.id} href={`/${usuario.username}`}>
            <a className="post">
              <div className="post-image">
                {usuario.profile.avatar ? (
                  <img src={usuario.profile.avatar} alt="" />
                ) : (
                  <img src="../imagenes/user-default.jpg" alt="" />
                )}
              </div>
              <div className="overlay">
                <div>
                  <span className="icon-bubble2 iconoLikes">
                    <b>{usuario.username}</b>
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
}
