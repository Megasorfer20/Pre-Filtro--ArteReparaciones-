import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ListadoReparaciones({ data, proveedor, empleado,inventarios }) {
  const [isActive, setIsActive] = useState(false);
  const [FechaCompra, setFechaCompra] = useState("");
  const [FechaEntrega, setFechaEntrega] = useState("");

  useEffect(() => {
    const formatDates = () => {
      let fechaCompraFormatted = "";
      let fechaEntregaFormatted = "";

      if (data.FechaCompra && Date.parse(data.FechaCompra)) {
        fechaCompraFormatted = format(
          new Date(data.FechaCompra),
          "dd MMMM 'del' yyyy",
          { locale: es }
        );
      }

      if (data.FechaEntrega && Date.parse(data.FechaEntrega)) {
        fechaEntregaFormatted = format(
          new Date(data.FechaEntrega),
          "dd MMMM 'del' yyyy",
          { locale: es }
        );
      }

      return { fechaCompraFormatted, fechaEntregaFormatted };
    };

    const { fechaCompraFormatted, fechaEntregaFormatted } = formatDates();

    setFechaCompra(fechaCompraFormatted);
    setFechaEntrega(fechaEntregaFormatted);
  }, [data]);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <h3>
              <strong>Empleado: </strong>
              {empleado && empleado.Nombre && empleado.Apellido
                ? `${empleado.Nombre} ${empleado.Apellido}`
                : "Indefinido"}
            </h3>
            <h3>
              <strong>Proveedor: </strong>
              {proveedor && proveedor.Nombre
                ? `${proveedor.Nombre}`
                : "Indefinido"}
            </h3>
            <h3>
              <strong>Empresa Proveedor: </strong>
              {proveedor && proveedor.Empresa
                ? `${proveedor.Empresa}`
                : "Indefinido"}
            </h3>

            <h3>
              <strong>Equipo: </strong>
              {data.TipoEquipo}
            </h3>
            <Button>Actualizar</Button>
            <Button>Eliminar</Button>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
            {/*<Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Especificaciones</Table.HeaderCell>
                  <Table.HeaderCell>Problemas</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <ul>
                      {data.Especificaciones.map((element) => (
                        <li key={element + "a"}>{element}</li>
                      ))}
                    </ul>
                  </Table.Cell>
                  <Table.Cell>
                    <ul>
                      {data.Problema.map((element) => (
                        <li key={element + "b"}>{element}</li>
                      ))}
                    </ul>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
                      </Table>*/}
            <p>
              <strong>Reparado: </strong>
              {data.Reparado ? "Reparado" : "Pendiente"}
            </p>
            <p>
              <strong>Fecha Compra: </strong>
              {FechaCompra}
            </p>
            {FechaEntrega !== "" && (
              <p>
                <strong>Fecha Entrega: </strong>$ {FechaEntrega}
              </p>
            )}
            {data.ValorPagar && (
              <p>
                <strong>Dinero Recibido: </strong>$ {data.ValorPagar}
              </p>
            )}
            <p>
              <strong></strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
