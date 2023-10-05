import React, {useState} from "react";
import ListadoEmpleados from "./ListadoEmpleados";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoSedes({ data }) {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <h3>{data.NombreSede}</h3>
            <p>
              <strong>Direccion: </strong>
              {data.Direccion}
            </p>
            <p>
              <strong>Telefono: </strong>+57 {data.Telefono}
            </p>
            <Button>Actualizar</Button>
            <Button>Eliminar</Button>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
            <Link to="/empleados/add">
            <Button>Agegar Empleado</Button>
            </Link>
            <ul>
              <ListadoEmpleados idSede={data._id}/>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
