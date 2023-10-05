import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Productos.css";
import ListadoProductos from "./ListaProductos";

export default function Productos({}) {
  const [productosApiData, setProductosApiData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/productos").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });
  }, []);

  const setProductosData = (data) => {
    let { _id, Producto, Sede, Stock, Precio, Compra } = data;
    localStorage.setItem("PRODUCTOID", _id);
    localStorage.setItem("NOMBREPRODUCTO", Producto);
    localStorage.setItem("SEDEPRODUCTO", Sede);
    localStorage.setItem("STOCKPRODUCTO", Stock);
    localStorage.setItem("PRECIOPRODUCTO", Precio);
    localStorage.setItem("COMPRAPRODUCTO", Compra);
  };

  return (
    <React.Fragment>
      <h1>Informacion de Productos</h1>
      <Link to="/productos/add">
        <Button>Nuevo Producto</Button>
      </Link>
      {productosApiData.map((element) => {
        return <ListadoProductos key={element._id} data={element} />;
      })}
    </React.Fragment>
  );
}
