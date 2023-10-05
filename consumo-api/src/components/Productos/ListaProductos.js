import React, {useState} from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListadoProductos({ data }) {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <h3>{data.Producto}</h3>
            <Button>Actualizar</Button>
            <Button>Eliminar</Button>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
           <p><strong>Disponible en: </strong>{data.Sede}</p>
           <p><strong>Stock: </strong>{data.Stock}</p>
           <p><strong>Precio: </strong>$ {data.Precio}</p>
           <p><strong></strong></p>
          </div>
        )}
      </div>
    </div>
  );
}