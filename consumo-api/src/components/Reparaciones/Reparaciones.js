import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Checkbox,
  Select,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Reparaciones.css";
import ListadoReparaciones from "./ListaReparaciones";

export default function Reparaciones({}) {
  const [productosApiData, setProductosApiData] = useState([]);
  const [empleadosApiData, setEmpleadosApiData] = useState([]);
  const [clientesApiData, setClientesApiData] = useState([]);
  const [showAddReparacion, setShowAddReparacion] = useState(false); // Agregamos el estado showAddReparacion

  const [formData, setFormData] = useState({
    TipoEquipo: "",
    Especificaciones: "",
    Problema: "",
    FechaIngreso: "",
    FechaDevolucion: "",
    ValorPagar: "",
    Reparado: false,
    Empleado: "",
    Cliente: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/reparaciones").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });

    axios.get(`http://localhost:5000/empleados`).then((response) => {
      console.log(response.data);
      setEmpleadosApiData(response.data);
    });

    axios.get(`http://localhost:5000/clientes`).then((response) => {
      console.log(response.data);
      setClientesApiData(response.data);
    });
  }, []);

  const setProductosData = (data) => {
    let {
      _id,
      TipoEquipo,
      Especificaciones,
      Problema,
      FechaIngreso,
      FechaDevolucion,
      ValorPagar,
      Reparado,
      Empleado,
      Cliente,
    } = data;
    localStorage.setItem("PRODUCTOID", _id);
    localStorage.setItem("TIPOEQUIPOREPARACIONES", TipoEquipo);
    localStorage.setItem(
      "ESPECIFICACIONESEQUIPOREPARACIONES",
      Especificaciones
    );
    localStorage.setItem("PROBLEMAEQUIPOREPARACIONES", Problema);
    localStorage.setItem("FECHAINGRESOREPARACIONES", FechaIngreso);
    localStorage.setItem("FECHADEVOLUCIONREPARACIONES", FechaDevolucion);
    localStorage.setItem("VALORPAGARREPARACIONES", ValorPagar);
    localStorage.setItem("REPARADOREPARACIONES", Reparado);
    localStorage.setItem("EMPLEADOREPARACIONES", Empleado);
    localStorage.setItem("CLIENTEREPARACIONES", Cliente);
  };

  const handleInputChange = (e, { name, value }) => {
    if(name === "Problema" || name === "Especificaciones"){
      const lines = value.split("\n");
      setFormData({ ...formData, [name]: lines });
    }else if(name === "ValorPagar" ){
      setFormData({ ...formData, [name]: Number(value) })
    }
    else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = () => {
    console.log(formData);

    axios
      .post("http://localhost:5000/reparaciones", formData)
      .then((response) => {
        console.log("Reparación creada con éxito");
        setFormData({
          TipoEquipo: "",
          Especificaciones: "",
          Problema: "",
          FechaIngreso: "",
          FechaDevolucion: "",
          ValorPagar: "",
          Reparado: false,
          Empleado: "",
          Cliente: "",
        });
        // Ocultar el formulario
        setShowAddReparacion(false);
        // Actualizar la lista de reparaciones si es necesario

      })
      .catch((error) => {
        console.error("Error al crear la reparación", error);
      });
  };

  return (
    <React.Fragment>
      <h1>Información de Reparaciones</h1>
      <Button onClick={() => setShowAddReparacion(!showAddReparacion)}>
        {showAddReparacion ? "Cancelar" : "Nueva Reparación"}
      </Button>
      {showAddReparacion && (
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <label>Tipo de Equipo</label>
            <Input
              type="text"
              name="TipoEquipo"
              value={formData.TipoEquipo}
              onChange={handleInputChange}
              placeholder="Tipo de Equipo"
            />
          </Form.Field>
          <Form.Field>
            <label>Especificaciones</label>
            <TextArea
              name="Especificaciones"
              onChange={handleInputChange}
              placeholder="Especificaciones"
            />
          </Form.Field>
          <Form.Field>
            <label>Problema</label>
            <TextArea
              name="Problema"
              onChange={handleInputChange}
              placeholder="Problema"
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha de Ingreso</label>
            <Input
              type="date"
              name="FechaIngreso"
              value={formData.FechaIngreso}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha de Devolución</label>
            <Input
              type="date"
              name="FechaDevolucion"
              value={formData.FechaDevolucion}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Valor a Pagar</label>
            <Input
              type="number"
              name="ValorPagar"
              value={formData.ValorPagar}
              onChange={handleInputChange}
              placeholder="Valor a Pagar"
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              name="Reparado"
              checked={formData.Reparado}
              onChange={(e, { name, checked }) =>
                setFormData({ ...formData, [name]: checked })
              }
              label="Reparado"
            />
          </Form.Field>
          <Form.Field>
            <label>Empleado</label>
            <select
              name="Empleado"
              value={formData.Empleado}
              onChange={(e) =>
                setFormData({ ...formData, Empleado: e.target.value })
              }
              className="select-style" // Agrega la clase de estilo aquí
            >
              <option value="" disabled>
                Seleccionar Empleado
              </option>
              {empleadosApiData.map((empleado) => (
                <option key={empleado._id} value={empleado._id}>
                  {empleado.Nombre} {empleado.Apellido}
                </option>
              ))}
            </select>
          </Form.Field>

          <Form.Field>
            <label>Cliente</label>
            <select
              name="Cliente"
              value={formData.Cliente}
              onChange={(e) =>
                setFormData({ ...formData, Cliente: e.target.value })
              }
              className="select-style" // Agrega la clase de estilo aquí
            >
              <option value="" disabled>
                Seleccionar Cliente
              </option>
              {clientesApiData.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.Nombre} {cliente.Apellido}
                </option>
              ))}
            </select>
          </Form.Field>

          <Button type="submit">Guardar</Button>
        </Form>
      )}

      {productosApiData.map((element) => {
        const empleadoRelacion = empleadosApiData.find(
          (el) => el._id === element.Empleado
        );

        const clienteRelacion = clientesApiData.find(
          (el) => el._id === element.Cliente
        );

        return (
          <ListadoReparaciones
            key={element._id}
            data={element}
            empleado={empleadoRelacion}
            cliente={clienteRelacion}
          />
        );
      })}
    </React.Fragment>
  );
}
