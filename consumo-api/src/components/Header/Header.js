import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";

export default function HeaderMain() {
    return (
        <Header>
            <Link to="/">
                <Button>Inicio</Button>
            </Link>
            <Link to="/compras">
                <Button>Compras</Button>
            </Link>
            <Link to="/ventas">
                <Button>Ventas</Button>
            </Link>
            <Link to="/reparaciones">
                <Button>Reparaciones</Button>
            </Link>
            <Link to="/productos">
                <Button>Productos</Button>
            </Link>
            <Link to="/sedes">
                <Button>Sedes</Button>
            </Link>
            <Link to="/proveedores">
                <Button>Proveedores</Button>
            </Link>
            <Link to="/clientes">
                <Button>Clientes</Button>
            </Link>
        </Header>
    );
}
