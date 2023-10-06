import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
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
            FechaVenta,
            Empleado,
            Elementos,
            Cliente,
            TotalPagar,
        } = data;
        localStorage.setItem("VENTASID", _id);
        localStorage.setItem("FECHAVENTAS", FechaVenta);
        localStorage.setItem("EMPLEADOVENTAS", Empleado);
        localStorage.setItem("ELEMENTOSVENTAS", Elementos);
        localStorage.setItem("CLIENTEVENTAS", Cliente);
        localStorage.setItem("TOTALPAGARVENTAS", TotalPagar);
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

                const productosRelacion = element.Elementos.map((elem) => {
                  
                    return InventariosApiData.find(
                        (el) => el._id === elem.ProductoVendido
                    );
                });

                console.log(productosRelacion);

                return (
                    <ListadoVentas
                        key={element._id}
                        data={element}
                        empleado={empleadoRelacion}
                        proveedor={proveedorRelacion}
                        inventarios={productosRelacion}
                    />
                );
            })}
        </React.Fragment>
    );
}
