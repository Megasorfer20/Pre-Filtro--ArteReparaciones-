import React, {useState} from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoClientes({ data }) {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <h3>{data.Nombre + " " + data.Apellido}</h3>
            <Button>Actualizar</Button>
            <Button>Eliminar</Button>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
           <p><strong>Dirección: </strong>{data.Direccion}</p>
           <p><strong>Teléfono: </strong>+57 {data.Telefono}</p>
           <p><strong>Email: </strong>{data.Email}</p>
           <p><strong></strong></p>
          </div>
        )}
      </div>
    </div>
  );
}