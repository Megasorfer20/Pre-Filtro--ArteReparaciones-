import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Sedes.css";
import ListadoEmpleados from "./ListadoEmpleados";

export default function Sedes() {
    const [sedesApiData, setSedesApiData] = useState([]);

    const [isActive, setIsActive] = useState(false);

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
            <h1>React Accordion Demo</h1>
            {sedesApiData.map((element) => {
                return (
                    <div className="accordion">
                        <div className="accordion-item">
                            <div
                                className="accordion-title"
                                onClick={() => setIsActive(!isActive)}
                            >
                                <div>
                                    <h3>{element.NombreSede}</h3>
                                    <p>
                                        <strong>Direccion: </strong>
                                        {element.Direccion}
                                    </p>
                                    <p>
                                        <strong>Telefono: </strong>+57{" "}
                                        {element.Telefono}
                                    </p>
                                    <Button>Actualizar</Button>
                                    <Button>Eliminar</Button>
                                </div>
                                <div>{isActive ? "-" : "+"}</div>
                            </div>
                            {isActive && (
                                <div className="accordion-content">
                                    <ul>
                                        <ListadoEmpleados
                                            idSede={element._id}
                                        />
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    );
}
