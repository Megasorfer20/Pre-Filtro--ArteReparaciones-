import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ListadoReparaciones({ data, cliente, empleado }) {
  const [isActive, setIsActive] = useState(false);
  const [FechaIngreso, setFechaIngreso] = useState("");
  const [FechaDevolucion, setFechaDevolucion] = useState("");

  useEffect(() => {
    const formatDates = () => {
      let fechaIngresoFormatted = "";
      let fechaDevolucionFormatted = "";

      if (data.FechaIngreso && Date.parse(data.FechaIngreso)) {
        fechaIngresoFormatted = format(
          new Date(data.FechaIngreso),
          "dd MMMM 'del' yyyy",
          { locale: es }
        );
      }

      if (data.FechaDevolucion && Date.parse(data.FechaDevolucion)) {
        fechaDevolucionFormatted = format(
          new Date(data.FechaDevolucion),
          "dd MMMM 'del' yyyy",
          { locale: es }
        );
      }

      return { fechaIngresoFormatted, fechaDevolucionFormatted };
    };

    const { fechaIngresoFormatted, fechaDevolucionFormatted } = formatDates();

    setFechaIngreso(fechaIngresoFormatted);
    setFechaDevolucion(fechaDevolucionFormatted);
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
              <strong>Cliente: </strong>
              {cliente && cliente.Nombre && cliente.Apellido
                ? `${cliente.Nombre} ${cliente.Apellido}`
                : "Indefinido"}
            </h3>

            {/*
            <h3>
              <strong>Empleado: </strong>
              {data.Empleado}
            </h3>
            <h3>
              <strong>Cliente: </strong>
              {data.Cliente}
            </h3>
              */}

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
            <Table singleLine>
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
            </Table>
            <p>
              <strong>Reparado: </strong>
              {data.Reparado ? "Reparado" : "Pendiente"}
            </p>
            <p>
              <strong>Fecha Ingreso: </strong>
              {FechaIngreso}
            </p>
            {FechaDevolucion !== "" && (
              <p>
                <strong>Fecha Devolucion: </strong>$ {FechaDevolucion}
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
