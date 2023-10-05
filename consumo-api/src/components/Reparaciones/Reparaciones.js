import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Reparaciones.css";
import ListadoReparaciones from "./ListaReparaciones";

export default function Reparaciones({}) {
  const [productosApiData, setProductosApiData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/reparaciones").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });
  }, []);

  const setProductosData = (data) => {
    let { _id, TipoEquipo,Especificaciones,Problema,FechaIngreso,FechaDevolucion,ValorPagar,Reparado,Empleado,Cliente } = data;
    localStorage.setItem("PRODUCTOID", _id);
    localStorage.setItem("TIPOEQUIPOREPARACIONES", TipoEquipo);
    localStorage.setItem("ESPECIFICACIONESEQUIPOREPARACIONES", Especificaciones);
    localStorage.setItem("PROBLEMAEQUIPOREPARACIONES", Problema);
    localStorage.setItem("FECHAINGRESOREPARACIONES", FechaIngreso);
    localStorage.setItem("FECHADEVOLUCIONREPARACIONES", FechaDevolucion);
    localStorage.setItem("VALORPAGARREPARACIONES", ValorPagar);
    localStorage.setItem("REPARADOREPARACIONES", Reparado);
    localStorage.setItem("EMPLEADOREPARACIONES", Empleado);
    localStorage.setItem("CLIENTEREPARACIONES", Cliente);
  };

  return (
    <React.Fragment>
      <h1>Informacion de Reparaciones</h1>
      <Link to="/reparaciones/add">
        <Button>Nueva Reparacion</Button>
      </Link>
      {productosApiData.map((element) => {
        return <ListadoReparaciones key={element._id} data={element} />;
      })}
    </React.Fragment>
  );
}
