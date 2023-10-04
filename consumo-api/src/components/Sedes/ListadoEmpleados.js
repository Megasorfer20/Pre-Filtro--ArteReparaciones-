import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoEmpleados({idSede}){
    const [empleadosApiData, setEmpleadosApiData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/empleados/${idSede}`).then((response) => {
            console.log(response.data);
            setEmpleadosApiData(response.data);
        });
    }, []);

    const setEmpleadosData = (data) => {
        let { _id, Nombre, Apellido, DNI, Telefono, Direccion, Sede, Cargo } =
            data;
        localStorage.setItem("EMPLEADOID", _id);
        localStorage.setItem("NOMBREEMPLEADO", Nombre);
        localStorage.setItem("APELLIDOEMPLEADO", Apellido);
        localStorage.setItem("DIRECCIONEMPLEADO", Direccion);
        localStorage.setItem("DNIEMPLEADO", DNI);
        localStorage.setItem("TELEFONOEMPLEADO", Telefono);
        localStorage.setItem("SEDEEMPLEADO", Sede);
        localStorage.setItem("CARGOEMPLEADO", Cargo);
    };

    return (
        <h2>Empleado X</h2>
    )
}