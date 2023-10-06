import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Productos.css";
import ListadoProductos from "./ListaProductos";

export default function Productos() {
  const [productosApiData, setProductosApiData] = useState([]);
  const [sedesApiData, setSedesApiData] = useState([]);
  const [formData, setFormData] = useState({
    Producto: "",
    Sede: "", // Cambiar a un campo de tipo select
    Stock: "",
    Precio: "",
    Compra: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Obtener la lista de productos
    axios.get("http://localhost:5000/productos").then((response) => {
      console.log(response.data);
      setProductosApiData(response.data);
    });

    // Obtener la lista de sedes
    axios.get("http://localhost:5000/sedes").then((response) => {
      console.log(response.data);
      setSedesApiData(response.data);
    });
  }, []);

  const handleFormSubmit = () => {
    // Envía los datos del formulario al servidor usando axios o fetch
    axios.post("http://localhost:5000/productos", formData).then((response) => {
      console.log("Producto creado con éxito:", response.data);
      // Actualiza la lista de productos después de agregar uno nuevo
      setProductosApiData([...productosApiData, response.data]);
      // Restablece el estado del formulario
      setFormData({
        Producto: "",
        Sede: "", // Cambiar a un campo de tipo select
        Stock: "",
        Precio: "",
        Compra: "",
      });
      // Oculta el formulario
      setShowForm(false);
    });
  };

  const handleCancel = () => {
    // Restablece el estado del formulario
    setFormData({
      Producto: "",
      Sede: "", // Cambiar a un campo de tipo select
      Stock: "",
      Precio: "",
      Compra: "",
    });
    // Oculta el formulario
    setShowForm(false);
  };

  // Función para manejar cambios en el campo "Sede"
  const handleSedeChange = (e, { value }) => {
    setFormData({ ...formData, Sede: value });
  };

  return (
    <React.Fragment>
      <h1>Información de Productos</h1>
      <Button onClick={() => setShowForm(true)}>Nuevo Producto</Button>
      {showForm && (
        <div>
          <h2>Crear Nuevo Producto</h2>
          <Form className="form" onSubmit={handleFormSubmit}>
            <Form.Field>
              <label>Producto</label>
              <Input
                type="text"
                placeholder="Producto"
                value={formData.Producto}
                onChange={(e) =>
                  setFormData({ ...formData, Producto: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
  <label>Sede</label>
  <select
    value={formData.Sede}
    onChange={handleSedeChange}
  >
    <option value="">Selecciona una sede</option>
    {sedesApiData.map((sede) => (
      <option key={sede._id} value={sede.NombreSede}>
        {sede.NombreSede}
      </option>
    ))}
  </select>
</Form.Field>

            <Form.Field>
              <label>Stock</label>
              <Input
                type="number"
                placeholder="Stock"
                value={formData.Stock}
                onChange={(e) =>
                  setFormData({ ...formData, Stock: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Precio</label>
              <Input
                type="number"
                placeholder="Precio"
                value={formData.Precio}
                onChange={(e) =>
                  setFormData({ ...formData, Precio: e.target.value })
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
      {productosApiData.map((element) => {
        return <ListadoProductos key={element._id} data={element} />;
      })}
    </React.Fragment>
  );
}
