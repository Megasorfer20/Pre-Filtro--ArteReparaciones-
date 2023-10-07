import React, {useState} from "react";
import ListadoEmpleados from "./ListadoEmpleados";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListadoSedes({ data }) {
    const [isActive, setIsActive] = useState(false);

    const handleDelete = () => {
      console.log(data._id);
      axios
        .delete(`http://localhost:5000/ventas/${data._id}`)
        .then(() => {
          console.log("Producto eliminado correctamente");
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
        });

        window.location.reload(true)
    };


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
            <Button onClick={handleDelete}>Eliminar</Button>
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
