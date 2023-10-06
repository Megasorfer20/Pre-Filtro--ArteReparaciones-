import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Compras.css";
import ListadoCompras from "./ListaCompras";
import axios from "axios";

export default function Compras() {
  const [comprasApiData, setcomprasApiData] = useState([]);
  const [empleadosApiData, setEmpleadosApiData] = useState([]);
  const [proveedoresApiData, setproveedoresApiData] = useState([]);
  const [InventariosApiData, setInventariosApiData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    FechaCompra: "",
    Proveedor: "",
    Elementos: [],
    Empleado: "",
    FechaEntrega: "",
    TotalPagar: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/compras").then((response) => {
      console.log(response.data);
      setcomprasApiData(response.data);
    });

    axios.get(`http://localhost:5000/empleados`).then((response) => {
      console.log(response.data);
      setEmpleadosApiData(response.data);
    });

    axios.get(`http://localhost:5000/proveedores`).then((response) => {
      console.log(response.data);
      setproveedoresApiData(response.data);
    });

    axios.get(`http://localhost:5000/inventarios`).then((response) => {
      console.log(response.data);
      setInventariosApiData(response.data);
    });
  }, []);

  const setComprasData = (data) => {
    let { _id, FechaCompra, Proveedor, Elementos, Empleado, FechaEntrega, TotalPagar } = data;
    localStorage.setItem("COMPRAID", _id);
    localStorage.setItem("FECHACOMPRA", FechaCompra);
    localStorage.setItem("PROVEEDORCOMPRA", Proveedor);
    localStorage.setItem("ELEMENTOSCOMPRA", Elementos);
    localStorage.setItem("EMPLEADOCOMPRAS", Empleado);
    localStorage.setItem("FECHAENTREGACOMPRAS", FechaEntrega);
    localStorage.setItem("TOTALPAGARCOMPRAS", TotalPagar);
  };

  const handleFormSubmit = () => {
    // Envía los datos del formulario al servidor usando axios o fetch
    axios.post("http://localhost:5000/compras", formData).then((response) => {
      console.log("Compra creada con éxito:", response.data);
      // Actualiza la lista de compras después de agregar una nueva
      setcomprasApiData([...comprasApiData, response.data]);
      // Restablece el estado del formulario
      setFormData({
        FechaCompra: "",
        Proveedor: "",
        Elementos: [],
        Empleado: "",
        FechaEntrega: "",
        TotalPagar: "",
      });
      // Oculta el formulario
      setShowForm(false);
    });
  };

  const handleCancel = () => {
    // Restablece el estado del formulario
    setFormData({
      FechaCompra: "",
      Proveedor: "",
      Elementos: [],
      Empleado: "",
      FechaEntrega: "",
      TotalPagar: "",
    });
    // Oculta el formulario
    setShowForm(false);
  };

  const handleProveedorChange = (e, { value }) => {
    setFormData({ ...formData, Proveedor: value });
  };

  const handleEmpleadoChange = (e, { value }) => {
    setFormData({ ...formData, Empleado: value });
  };

  const handleInventarioChange = (e, { value }) => {
    setFormData({ ...formData, Elementos: value });
  };

  return (
    <React.Fragment>
      <h1>Informacion de Compras</h1>
      <Button onClick={() => setShowForm(true)}>Nueva Compra</Button>
      {showForm && (
        <div>
          <h2>Crear Nueva Compra</h2>
          <Form className="form" onSubmit={handleFormSubmit}>
            <Form.Field>
              <label>Fecha de Compra</label>
              <Input
                type="date"
                placeholder="Fecha de Compra"
                value={formData.FechaCompra}
                onChange={(e) =>
                  setFormData({ ...formData, FechaCompra: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
  <label>Proveedor</label>
  <select
    value={formData.Proveedor}
    onChange={(e) =>
      setFormData({ ...formData, Proveedor: e.target.value })
    }
  >
    <option value="">Selecciona un proveedor</option>
    {proveedoresApiData.map((proveedor) => (
      <option key={proveedor._id} value={proveedor._id}>
        {proveedor.Nombre}
      </option>
    ))}
  </select>
</Form.Field>

            <Form.Field>
              <label>Elementos</label>
              <Dropdown
                fluid
                multiple
                search
                selection
                options={InventariosApiData.map((inventario) => ({
                  key: inventario._id,
                  text: inventario.Nombre,
                  value: inventario._id,
                }))}
                placeholder="Selecciona elementos"
                value={formData.Elementos}
                onChange={handleInventarioChange}
              />
            </Form.Field>
            <Form.Field>
  <label>Empleado</label>
  <select
    value={formData.Empleado}
    onChange={(e) =>
      setFormData({ ...formData, Empleado: e.target.value })
    }
  >
    <option value="">Selecciona un empleado</option>
    {empleadosApiData.map((empleado) => (
      <option key={empleado._id} value={empleado._id}>
        {`${empleado.Nombre} ${empleado.Apellido}`}
      </option>
    ))}
  </select>
</Form.Field>

            <Form.Field>
              <label>Fecha de Entrega</label>
              <Input
                type="date"
                placeholder="Fecha de Entrega"
                value={formData.FechaEntrega}
                onChange={(e) =>
                  setFormData({ ...formData, FechaEntrega: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Total a Pagar</label>
              <Input
                type="number"
                placeholder="Total a Pagar"
                value={formData.TotalPagar}
                onChange={(e) =>
                  setFormData({ ...formData, TotalPagar: e.target.value })
                }
              />
            </Form.Field>
            <Button type="submit">Guardar</Button>
            <Button type="button" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form>
        </div>
      )}
      {comprasApiData.map((element) => {
        const empleadoRelacion = empleadosApiData.find(
          (el) => el._id === element.Empleado
        );

        const proveedorRelacion = proveedoresApiData.find(
          (el) => el._id === element.Proveedor
        );

        const inventariosRelacion = element.Elementos.map((elem) => {
          return InventariosApiData.find(
            (el) => el._id === elem.ProductoComprado
          );
        });

        console.log(inventariosRelacion);

        return (
          <ListadoCompras
            key={element._id}
            data={element}
            empleado={empleadoRelacion}
            proveedor={proveedorRelacion}
            inventarios={inventariosRelacion}
          />
        );
      })}
    </React.Fragment>
  );
}
