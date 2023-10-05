import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoEmpleados({ idSede }) {
    const [empleadosApiData, setEmpleadosApiData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/empleados/idSede/${idSede}`)
            .then((response) => {
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
        <>
            {empleadosApiData.map((element) => {
                return (
                    <li key={element._id}>
                        <h3>{element.Nombre + " " + element.Apellido}</h3>
                        <p>
                            <strong>Telefono: </strong>+57 {element.Telefono}
                        </p>
                        <p>
                            <strong>Direccion: </strong>
                            {element.Direccion}
                        </p>
                        <p>
                            <strong>Cago: </strong>
                            {element.Cargo}
                        </p>
                        <Link to="/empleados/update">
                            <Button>Actualizar</Button>
                        </Link>
                        <Button>Eliminar</Button>
                    </li>
                );
            })}
        </>
    );
}
