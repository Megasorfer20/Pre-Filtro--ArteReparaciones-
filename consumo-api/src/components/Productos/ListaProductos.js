import React, {useState} from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListadoProductos({ data }) {
    const [isActive, setIsActive] = useState(false);


    const handleDeleteProduct = () => {
      console.log(data._id);
      axios
        .delete(`http://localhost:5000/productos/${data._id}`)
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
            <h3>{data.Producto}</h3>
            <Link to="/productos/update">
            <Button>Actualizar</Button>
            </Link>
            <Button onClick={handleDeleteProduct}>Eliminar</Button>
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