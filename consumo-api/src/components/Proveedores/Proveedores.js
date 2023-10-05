import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Proveedores.css";
import ListadoProveedores from "./ListadoProveedores";


export default function Proveedores({}) {
    const [proveedoresApiData, setProveedoresApiData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/proveedores").then((response) => {
            console.log(response.data);
            setProveedoresApiData(response.data);
        });
    }, []);

    const setProveedoresData = (data) => {
        let { _id,Nombre,Empresa,Direccion,Telefono,Email,} = data;
        localStorage.setItem("PROVEEDORID", _id);
        localStorage.setItem("NOMBREPROVEEDOR", Nombre);
        localStorage.setItem("EMPRESAPROVEEDOR", Empresa);
        localStorage.setItem("DIRECCIONPROVEEDOR", Direccion);
        localStorage.setItem("TELEFONOPROVEEDOR", Telefono);
        localStorage.setItem("EMAILPROVEEDOR", Email);
    };

    return (
        <React.Fragment>
            <h1>Informacion de proveedores</h1>
            <Link to="/proveedores/add">
            <Button>Nueva Sede</Button>
            </Link>
            {proveedoresApiData.map((element) => {
                return (
                    <ListadoProveedores key={element._id} data={element}/>
                );
            })}
        </React.Fragment>
    );
}
