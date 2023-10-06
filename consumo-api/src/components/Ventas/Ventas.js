import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Ventas.css";
import ListadoVentas from "./ListaVentas";

export default function Ventas() {
    const [ventasApiData, setventasApiData] = useState([]);
    const [empleadosApiData, setEmpleadosApiData] = useState([]);
    const [proveedoresApiData, setproveedoresApiData] = useState([]);
    const [InventariosApiData, setInventariosApiData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/ventas").then((response) => {
            console.log(response.data);
            setventasApiData(response.data);
        });

        axios.get(`http://localhost:5000/empleados`).then((response) => {
            console.log(response.data);
            setEmpleadosApiData(response.data);
        });

        axios.get(`http://localhost:5000/clientes`).then((response) => {
            console.log(response.data);
            setproveedoresApiData(response.data);
        });

        axios.get(`http://localhost:5000/productos`).then((response) => {
            console.log(response.data);
            setInventariosApiData(response.data);
        });
    }, []);

    const setventasData = (data) => {
        let {
            _id,
            FechaCompra,
            Proveedor,
            Elementos,
            Empleado,
            FechaEntrega,
            TotalPagar,
        } = data;
        localStorage.setItem("COMPRAID", _id);
        localStorage.setItem("FECHACOMPRA", FechaCompra);
        localStorage.setItem("PROVEEDORCOMPRA", Proveedor);
        localStorage.setItem("ELEMENTOSCOMPRA", Elementos);
        localStorage.setItem("EMPLEADOventas", Empleado);
        localStorage.setItem("FECHAENTREGAventas", FechaEntrega);
        localStorage.setItem("TOTALPAGARventas", TotalPagar);
    };

    return (
        <React.Fragment>
            <h1>Informacion de Ventas</h1>
            <Link to="/ventas/add">
                <Button>Nueva venta</Button>
            </Link>
            {ventasApiData.map((element) => {
                const empleadoRelacion = empleadosApiData.find(
                    (el) => el._id === element.Empleado
                );

                const proveedorRelacion = proveedoresApiData.find(
                    (el) => el._id === element.Cliente
                );

                const inventariosRElacion = element.Elementos.map((elem) => {
                    return InventariosApiData.find(
                        (el) => el._id === elem.ProductoVendido
                    );
                });

                console.log(inventariosRElacion);

                return (
                    <ListadoVentas
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
