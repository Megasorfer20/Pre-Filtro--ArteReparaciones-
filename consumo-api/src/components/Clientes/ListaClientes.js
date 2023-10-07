import React, {useState} from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListadoClientes({ data }) {
    const [isActive, setIsActive] = useState(false);

    const handleDelete = () => {
      console.log(data._id);
      axios
        .delete(`http://localhost:5000/clientes/${data._id}`)
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
            <h3>{data.Nombre + " " + data.Apellido}</h3>
            <Button>Actualizar</Button>
            <Button onClick={handleDelete}>Eliminar</Button>
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