import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoInventarios({ idSede }) {
  const [empleadosApiData, setEmpleadosApiData] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/clientes/${id}`)
      .then(() => {
        console.log("Producto eliminado correctamente");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });

      window.location.reload(true)
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/inventarios/idProveedor/${idSede}`)
      .then((response) => {
        console.log(response.data);
        setEmpleadosApiData(response.data);
      });
  }, []);

  const setEmpleadosData = (data) => {
    let { _id, Producto, Precio, Stock, Proveedor} = data;
    localStorage.setItem("INVENTARIOID", _id);
    localStorage.setItem("PRODUCTOINVENTARIO", Producto);
    localStorage.setItem("PRECIOINVENTARIO", Precio);
    localStorage.setItem("STOCKINVENTARIO", Stock);
    localStorage.setItem("PROVEEDORINVENTARIO", Proveedor);
  };

  return (
    <>
      {empleadosApiData.map((element) => {
        return (
          <li key={element._id}>
            <h3>{element.Producto}</h3>
            <p>
              <strong>Stock: </strong>
              {element.Stock}
            </p>
            <p>
              <strong>Preico: </strong>$ {element.Precio}
            </p>
            <Link to="/inventarios/update">
              <Button>Actualizar</Button>
            </Link>
            <Button onClick={()=> handleDelete(element._id)}>Eliminar</Button>
          </li>
        );
      })}
    </>
  );
}
