import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Sedes.css";
import ListadoSedes from "./ListadoSedes";


export default function Sedes({}) {
    const [sedesApiData, setSedesApiData] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:5000/sedes").then((response) => {
            console.log(response.data);
            setSedesApiData(response.data);
        });
    }, []);

    const setSedesData = (data) => {
        let { _id, NombreSede, Direccion, Telefono, CantidadEmpleados } = data;
        localStorage.setItem("SEDEID", _id);
        localStorage.setItem("NOMBRESEDE", NombreSede);
        localStorage.setItem("DIRECCIONSEDE", Direccion);
        localStorage.setItem("TELEFONOSEDE", Telefono);
        localStorage.setItem("CANTIDADEMPLEADOSSEDE", CantidadEmpleados);
    };

    return (
        <React.Fragment>
            <h1>Informacion de Sedes</h1>
            <Link to="/sedes/add">
            <Button>Nueva Sede</Button>
            </Link>
            {sedesApiData.map((element) => {
                return (
                    <ListadoSedes key={element._id} data={element}/>
                );
            })}
        </React.Fragment>
    );
}
