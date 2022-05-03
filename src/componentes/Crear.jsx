import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Crear = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [tecnologias, setTecnologias] = useState("");

  const navigate = useNavigate();

  const usuariosCollection = collection(db, "usuarios");

  const addUsuarios = async (e) => {
    e.preventDefault();
    await addDoc(usuariosCollection, {
      nombre: nombre,
      apellidos: apellidos,
      edad: edad,
      pais: pais,
      tecnologias: tecnologias,
    });
    navigate("/");
    //console.log(e.target[0].value)
  };

  return (
    <div className="container">
      <div className="row g-3 align-items-center">
        <div className="col">
          <h1>Crear Usuario</h1>
          <form onSubmit={addUsuarios}>
            <div className="row mb-3 mt-5">
              <div className="col-6">
                <label className="form-label">Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Apellidos</label>
                <input
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  type="string"
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">edad</label>
              <input
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pais</label>
              <input
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                type="string"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tecnologias</label>
              <textarea
                value={tecnologias}
                onChange={(e) => setTecnologias(e.target.value)}
                name="Tecnologias"
                id=""
                cols="30"
                rows="10"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Crear;
