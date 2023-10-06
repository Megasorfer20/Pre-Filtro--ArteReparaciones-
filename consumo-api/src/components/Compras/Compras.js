import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Compras.css";
import ListadoReparaciones from "./ListaCompras";

export default function Compras() {
  const [comprasApiData, setcomprasApiData] = useState([]);
  const [empleadosApiData, setEmpleadosApiData] = useState([]);
  const [proveedoresApiData, setproveedoresApiData] = useState([]);
  const [InventariosApiData, setInventariosApiData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reparaciones").then((response) => {
      console.log(response.data);
      setcomprasApiData(response.data);
    });

    axios.get(`http://localhost:5000/empleados`).then((response) => {
      console.log(response.data);
      setEmpleadosApiData(response.data);
    });

    axios.get(`http://localhost:5000/proveedores`).then((response) => {
      console.log(response.data);
      setproveedoresApiData(response.data);
    });

    axios.get(`http://localhost:5000/inventarios`).then((response) => {
      console.log(response.data);
      setInventariosApiData(response.data);
    });
  }, []);

  const setComprasData = (data) => {
    let {_id,FechaCompra,Proveedor,Elementos,Empleado,FechaEntrega,TotalPagar,
    } = data;
    localStorage.setItem("COMPRAID", _id);
    localStorage.setItem("FECHACOMPRA", FechaCompra);
    localStorage.setItem("PROVEEDORCOMPRA",Proveedor);
    localStorage.setItem("ELEMENTOSCOMPRA", Elementos);
    localStorage.setItem("EMPLEADOCOMPRAS", Empleado);
    localStorage.setItem("FECHAENTREGACOMPRAS", FechaEntrega);
    localStorage.setItem("TOTALPAGARCOMPRAS", TotalPagar);
  };

  return (
    <React.Fragment>
      <h1>Informacion de Reparaciones</h1>
      <Link to="/comprass/add">
        <Button>Nueva Compra</Button>
      </Link>
      {comprasApiData.map((element) => {
        const empleadoRelacion = empleadosApiData.find(
          (el) => el._id === element.Empleado
        );

        const proveedorRelacion = proveedoresApiData.find(
          (el) => el._id === element.Proveedor
        );
        
        const inventariosRElacion = element.Elementos.map(elem => {
          return InventariosApiData.find(
            el => el._id === elem.ProductoComprado
          )
        })

        return (
          <ListadoReparaciones
            key={element._id}
            data={element}
            empleado={empleadoRelacion}
            proveedor={proveedorRelacion}
            inventarios={inventariosRElacion}
          />
        );
      })}
    </React.Fragment>
  );
}
