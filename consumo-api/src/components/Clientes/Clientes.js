import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Clientes.css";
import ListadoClientes from "./ListaClientes";

export default function Clientes() {
  const [productosApiData, setProductosApiData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/clientes").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });
  }, []);

  const setProductosData = (data) => {
    let { _id, Nombre, Apellido, Direccion, Telefono, Email } = data;
    localStorage.setItem("CLIENTEID", _id);
    localStorage.setItem("NOMBRECLIENTE", Nombre);
    localStorage.setItem("APELLIDOCLIENTE", Apellido);
    localStorage.setItem("DIRECCIONCLIENTE", Direccion);
    localStorage.setItem("TELEFONOCLIENTE", Telefono);
    localStorage.setItem("COMPRACLIENTE", Email);
  };

  return (
    <React.Fragment>
      <h1>Informacion de Productos</h1>
      <Link to="/productos/add">
        <Button>Nuevo Cliente</Button>
      </Link>
      {productosApiData.map((element) => {
        return <ListadoClientes key={element._id} data={element} />;
      })}
    </React.Fragment>
  );
}
