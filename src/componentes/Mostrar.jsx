import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";

const MySwal = withReactContent(Swal);

const Mostrar = () => {
  //1.- configuramos los hooks
  const [usuarios, setUsuarios] = useState([]);

  //2.- referenciamos a la BD de firestore
  const usuariosCollection = collection(db, "usuarios");

  //3.- funcion para mostrar todos los docs
  const getUsuarios = async () => {
    const data = await getDocs(usuariosCollection);
    //console.log(data.docs);
    setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(usuarios);
  };

  //4.- funcion para eliminar un doc
  const deleteUsuario = async (id) => {
    const usuarioDoc = doc(db, "usuarios", id);
    await deleteDoc(usuarioDoc);
    getUsuarios();
  };

  //5.- funcion de confirmacion para sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "¿Elimina el producto?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la fcion para eliminar
        deleteUsuario(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //6.- usamos useEffect
  useEffect(() => {
    getUsuarios();
    // eslint-disable-next-line
  }, []);

  //7.- devolvemos la vista
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-grid gap2">
            <Link to="/crear" className="btn btn-secondary mt-2 mb-2">
              Create
            </Link>
          </div>
          <div className="col d-flex flex-wrap">
            {usuarios.map((usuario) => (
              <div className="card w-24 m-1" key={usuario.id}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="font-weight-bold">Nombre: </span>
                    {usuario.nombre + " " + usuario.apellidos}
                  </li>
                  <li className="list-group-item">
                    <span className="font-weight-bold">Edad: </span>
                    {usuario.edad}
                  </li>
                  <li className="list-group-item">
                    <span className="font-weight-bold">Nacionaliad: </span>
                    {usuario.pais}
                  </li>
                  <li className="list-group-item">
                    <span className="font-weight-bold">Skils: </span>
                    {usuario.tecnologias}
                  </li>
                </ul>
                <div className="card-body">
                  <Link to={`/editar/${usuario.id}`} className="btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
                  <button
                    onClick={() => {
                      confirmDelete(usuario.id);
                    }}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mostrar;
