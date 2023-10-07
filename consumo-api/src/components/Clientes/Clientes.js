import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Clientes.css";
import ListadoClientes from "./ListaClientes";
import axios from "axios";

export default function Clientes() {
    const [productosApiData, setProductosApiData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        Nombre: "",
        Apellido: "",
        Direccion: "",
        Telefono: "",
        Email: "",
    });

    useEffect(() => {
        axios.get("http://localhost:5000/clientes").then((response) => {
            console.log(response.data);
            setProductosApiData(response.data);
        });
    }, []);

    const setProductosData = (data) => {
        let { _id, Nombre, Apellido, Direccion, Telefono, Email } = data;
        localStorage.setItem("CLIENTEID", _id);
        localStorage.setItem("NOMBRECLIENTE", Nombre);
        localStorage.setItem("APELLIDOCLIENTE", Apellido);
        localStorage.setItem("DIRECCIONCLIENTE", Direccion);
        localStorage.setItem("TELEFONOCLIENTE", Telefono);
        localStorage.setItem("COMPRACLIENTE", Email);
    };

    const handleFormSubmit = () => {
        axios
            .post("http://localhost:5000/clientes", formData)
            .then((response) => {
                console.log("Cliente creado con éxito:", response.data);
                setProductosApiData([...productosApiData, response.data]);
                setFormData({
                    Nombre: "",
                    Apellido: "",
                    Direccion: "",
                    Telefono: "",
                    Email: "",
                });
                setShowForm(false);
            });
    };

    const handleCancel = () => {
        setFormData({
            Nombre: "",
            Apellido: "",
            Direccion: "",
            Telefono: "",
            Email: "",
        });
        setShowForm(false);
    };

    return (
        <React.Fragment>
            <h1>Información de Productos</h1>
            {!showForm? <Button onClick={() => setShowForm(true)}>Nuevo Cliente</Button> : (
              <div>
              <h2>Crear Nuevo Cliente</h2>
              <Form className="form" onSubmit={handleFormSubmit}>
                  <Form.Field>
                      <label>Nombre</label>
                      <Input
                          type="text"
                          placeholder="Nombre"
                          value={formData.Nombre}
                          onChange={(e) =>
                              setFormData({
                                  ...formData,
                                  Nombre: e.target.value,
                              })
                          }
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Apellido</label>
                      <Input
                          type="text"
                          placeholder="Apellido"
                          value={formData.Apellido}
                          onChange={(e) =>
                              setFormData({
                                  ...formData,
                                  Apellido: e.target.value,
                              })
                          }
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Dirección</label>
                      <Input
                          type="text"
                          placeholder="Dirección"
                          value={formData.Direccion}
                          onChange={(e) =>
                              setFormData({
                                  ...formData,
                                  Direccion: e.target.value,
                              })
                          }
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Teléfono</label>
                      <Input
                          type="tel"
                          placeholder="Teléfono"
                          value={formData.Telefono}
                          onChange={(e) =>
                              setFormData({
                                  ...formData,
                                  Telefono: e.target.value,
                              })
                          }
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Email</label>
                      <Input
                          type="email"
                          placeholder="Email"
                          value={formData.Email}
                          onChange={(e) =>
                              setFormData({
                                  ...formData,
                                  Email: e.target.value,
                              })
                          }
                      />
                  </Form.Field>
                  <Button type="submit">Guardar</Button>
                  <Button type="button" onClick={handleCancel}>
                      Cancelar
                  </Button>{" "}
                  {/* Agrega el botón de cancelar */}
              </Form>
          </div>
            ) }
            {productosApiData.map((element) => {
                return <ListadoClientes key={element._id} data={element} />;
            })}
        </React.Fragment>
    );
}
