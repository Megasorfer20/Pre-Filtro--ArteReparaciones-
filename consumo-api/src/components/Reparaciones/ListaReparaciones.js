import React, {useState,useEffect} from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListadoReparaciones({ data }) {
    const [isActive, setIsActive] = useState(false);
    const [empleadosApiData, setEmpleadosApiData] = useState([])
    const [clientesApiData, setClientesApiData] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:5000/empleados/${data.Empleado}`).then((response) => {
        console.log(response.data);
        setEmpleadosApiData(response.data);
      });

      axios.get(`http://localhost:5000/clientes/${data.Cliente}`).then((response) => {
        console.log(response.data);
        setClientesApiData(response.data);
      }).then(
        console.log(empleadosApiData))
    }, []);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <h3><strong>Empleado: </strong>{`${empleadosApiData.Nombre} ${empleadosApiData.Apellido}`}</h3>
            <h3><strong>Cliente: </strong>{`${clientesApiData.Nombre} ${clientesApiData.Apellido}`}</h3>
            <h3><strong>Equipo: </strong>{data.TipoEquipo}</h3>
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
                    {data.Especificaciones.map(element => 
                     <li>{element}</li>)}
                  </ul>
                  </Table.Cell>
                  <Table.Cell>
                  <ul>
                    {data.Problema.map(element => <li>{element}</li>)}
                    </ul>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
           </Table>
           <p><strong>Stock: </strong>{data.Stock}</p>
           <p><strong>Precio: </strong>$ {data.Precio}</p>
           <p><strong></strong></p>
          </div>
        )}
      </div>
    </div>
  );
}