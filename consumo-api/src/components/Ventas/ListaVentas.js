import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios";

export default function ListadoVentas({
    data,
    proveedor,
    empleado,
    inventarios,
}) {
    const [isActive, setIsActive] = useState(false);
    const [FechaVenta, setFechaVenta] = useState("");

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

    useEffect(() => {
        const formatDates = () => {
            let fechaVentaFormatted = "";

            if (data.FechaVenta && Date.parse(data.FechaVenta)) {
                fechaVentaFormatted = format(
                    new Date(data.FechaVenta),
                    "dd MMMM 'del' yyyy",
                    { locale: es }
                );
            }

            return { fechaVentaFormatted };
        };

        const { fechaVentaFormatted } = formatDates();

        setFechaVenta(fechaVentaFormatted);
    }, [data]);

    return (
        <div className="accordion">
            <div className="accordion-item">
                <div
                    className="accordion-title"
                    onClick={() => setIsActive(!isActive)}
                >
                    <div>
                        <h3>
                            <strong>Empleado: </strong>
                            {empleado && empleado.Nombre && empleado.Apellido
                                ? `${empleado.Nombre} ${empleado.Apellido}`
                                : "Indefinido"}
                        </h3>
                        <h3>
                            <strong>Cliente: </strong>
                            {proveedor && proveedor.Nombre && proveedor.Apellido
                                ? `${proveedor.Nombre} ${proveedor.Apellido}`
                                : "Indefinido"}
                        </h3>
                        <Button>Actualizar</Button>
                        <Button onClick={handleDelete}>Eliminar</Button>
                    </div>
                    <div>{isActive ? "-" : "+"}</div>
                </div>
                {isActive && (
                    <div className="accordion-content">
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Productos Vendidos
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <ul>
                                            {inventarios.map((element) => (
                                                <li key={element._id}>
                                                    <p>
                                                        <strong>
                                                            Producto:{" "}
                                                        </strong>
                                                        {element.Producto}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Precio:{" "}
                                                        </strong>
                                                        {element.Precio}
                                                    </p>

                                                    {data.Elementos.map(
                                                        (el) => {
                                                            if (
                                                                el.ProductoVendido ===
                                                                element._id
                                                            ) {
                                                                return (
                                                                    <p>
                                                                        <strong>
                                                                            Cantidad:{" "}
                                                                        </strong>
                                                                        {
                                                                            el.Cantidad
                                                                        }
                                                                    </p>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <p>
                            <strong>Fecha Venta: </strong>
                            {FechaVenta}
                        </p>

                        {data.TotalPagar && (
                            <p>
                                <strong>Dinero Recibido: </strong>${" "}
                                {data.TotalPagar}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
