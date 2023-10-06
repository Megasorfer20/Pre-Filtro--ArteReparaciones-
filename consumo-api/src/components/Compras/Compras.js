import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Compras.css";
import ListadoReparaciones from "./ListaCompras";

export default function Compras({}) {
  const [productosApiData, setProductosApiData] = useState([]);
  const [empleadosApiData, setEmpleadosApiData] = useState([]);
  const [clientesApiData, setClientesApiData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reparaciones").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });

    axios.get(`http://localhost:5000/empleados`).then((response) => {
      console.log(response.data);
      setEmpleadosApiData(response.data);
    });

    axios.get(`http://localhost:5000/clientes`).then((response) => {
      console.log(response.data);
      setClientesApiData(response.data);
    });
  }, []);

  const setProductosData = (data) => {
    let {
      _id,
      TipoEquipo,
      Especificaciones,
      Problema,
      FechaIngreso,
      FechaDevolucion,
      ValorPagar,
      Reparado,
      Empleado,
      Cliente,
    } = data;
    localStorage.setItem("PRODUCTOID", _id);
    localStorage.setItem("TIPOEQUIPOREPARACIONES", TipoEquipo);
    localStorage.setItem(
      "ESPECIFICACIONESEQUIPOREPARACIONES",
      Especificaciones
    );
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
        const empleadoRelacion = empleadosApiData.find(
          (el) => el._id === element.Empleado
        );

        const clienteRelacion = clientesApiData.find(
          (el) => el._id === element.Cliente
        );
        
        return (
          <ListadoReparaciones
            key={element._id}
            data={element}
            empleado={empleadoRelacion}
            cliente={clienteRelacion}
          />
        );
      })}
    </React.Fragment>
  );
}
