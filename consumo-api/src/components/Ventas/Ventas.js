import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Ventas.css";
import ListadoVentas from "./ListaVentas";

export default function Ventas() {
  const [ventasApiData, setventasApiData] = useState([]);
  const [empleadosApiData, setEmpleadosApiData] = useState([]);
  const [proveedoresApiData, setproveedoresApiData] = useState([]);
  const [inventariosApiData, setInventariosApiData] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    axios.get("http://localhost:5000/ventas").then((response) => {
      console.log(response.data);
      setventasApiData(response.data);
    });

    axios.get("http://localhost:5000/empleados").then((response) => {
      console.log(response.data);
      setEmpleadosApiData(response.data);
    });

    axios.get("http://localhost:5000/clientes").then((response) => {
      console.log(response.data);
      setproveedoresApiData(response.data);
    });

    axios.get("http://localhost:5000/productos").then((response) => {
      console.log(response.data);
      setInventariosApiData(response.data);
    });
  }, []);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    FechaVenta: "",
    Empleado: "",
    Elementos: [],
    Cliente: "",
    TotalPagar: "",
  });

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = () => {
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    // y actualizar la lista de ventas si es necesario
    // También puedes restablecer el formulario después de enviar los datos
    console.log(formData);
  };

  // Función para cancelar la operación y ocultar el formulario
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <React.Fragment>
      <h1>Información de Ventas</h1>
      <Button onClick={() => setShowForm(true)}>Nueva Venta</Button>

      {/* Formulario para agregar una nueva venta */}
      {showForm && (
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <label>Fecha de Venta</label>
            <Input
              type="date"
              name="FechaVenta"
              value={formData.FechaVenta}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Empleado</label>
            <select
              name="Empleado"
              value={formData.Empleado}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccionar Empleado
              </option>
              {empleadosApiData.map((empleado) => (
                <option key={empleado._id} value={empleado._id}>
                  {empleado.Nombre}
                </option>
              ))}
            </select>
          </Form.Field>

          <Form.Field>
            <label>Cliente</label>
            <select
              name="Cliente"
              value={formData.Cliente}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccionar Cliente
              </option>
              {proveedoresApiData.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.Nombre}
                </option>
              ))}
            </select>
          </Form.Field>

          <Form.Field>
            <label>Elementos</label>
            <select
              name="Elementos"
              multiple
              value={formData.Elementos}
              onChange={handleInputChange}
            >
              {inventariosApiData.map((producto) => (
                <option key={producto._id} value={producto._id}>
                  {producto.Producto} - ${producto.Precio}
                </option>
              ))}
            </select>
          </Form.Field>

          <Form.Field>
            <label>Total a Pagar</label>
            <Input
              type="number"
              name="TotalPagar"
              value={formData.TotalPagar}
              onChange={handleInputChange}
            />
          </Form.Field>

          {/* Botón para cancelar */}
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>

          {/* Botón para guardar la venta */}
          <Button type="submit">Guardar Venta</Button>
        </Form>
      )}

      {/* Listado de ventas */}
      {ventasApiData.map((element) => {
        const empleadoRelacion = empleadosApiData.find(
          (el) => el._id === element.Empleado
        );

        const proveedorRelacion = proveedoresApiData.find(
          (el) => el._id === element.Cliente
        );

        const productosRelacion = element.Elementos.map((elem) => {
          return inventariosApiData.find(
            (el) => el._id === elem.ProductoVendido
          );
        });

        return (
          <ListadoVentas
            key={element._id}
            data={element}
            empleado={empleadoRelacion}
            proveedor={proveedorRelacion}
            inventarios={productosRelacion}
          />
        );
      })}
    </React.Fragment>
  );
}
