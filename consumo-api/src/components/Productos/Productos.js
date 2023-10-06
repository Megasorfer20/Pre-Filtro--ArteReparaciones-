import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import "./Productos.css";
import ListadoProductos from "./ListaProductos";

export default function Productos() {
    const [productosApiData, setProductosApiData] = useState([]);
    const [sedesApiData, setSedesApiData] = useState([]);
    const [formData, setFormData] = useState({
        Producto: "",
        Sede: "",
        Stock: "",
        Precio: "",
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/productos").then((response) => {
            console.log(response.data);
            setProductosApiData(response.data);
        });

        axios.get("http://localhost:5000/sedes").then((response) => {
            console.log(response.data);
            setSedesApiData(response.data);
        });
    }, []);

    const setProductosData = (data) => {
      let { _id, Producto, Sede, Stock, Precio, Compra } = data;
      localStorage.setItem("PRODUCTOID", _id);
      localStorage.setItem("NOMBREPRODUCTO", Producto);
      localStorage.setItem("SEDEPRODUCTO", Sede);
      localStorage.setItem("STOCKPRODUCTO", Stock);
      localStorage.setItem("PRECIOPRODUCTO", Precio);
      localStorage.setItem("COMPRAPRODUCTO", Compra);
    };

    const handleFormSubmit = () => {
        axios
            .post("http://localhost:5000/productos", formData)
            .then((response) => {
                console.log("Producto creado con éxito:", response.data);
                setProductosApiData([...productosApiData, response.data]);
              });
              setFormData({
                  Producto: "",
                  Sede: "",
                  Stock: "",
                  Precio: "",
              });
              setShowForm(false);
              window.location.reload(true)
    };

    const handleCancel = () => {
        setFormData({
            Producto: "",
            Sede: "",
            Stock: "",
            Precio: "",
        });
        setShowForm(false);
    };

    return (
        <React.Fragment>
            <h1>Información de Productos</h1>

            {!showForm ? (
                <Button onClick={() => setShowForm(true)}>
                    Nuevo Producto
                </Button>
            ) : (
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
                                    setFormData({
                                        ...formData,
                                        Producto: e.target.value,
                                    })
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Sede</label>
                            <select
                                value={formData.Sede}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Sede: e.target.value,
                                    })
                                }
                            >
                                <option value="">Selecciona una sede</option>
                                {sedesApiData.map((sede) => (
                                        <option
                                            key={sede._id}
                                            value={sede.NombreSede}
                                        >
                                            {sede.NombreSede}
                                        </option>
                                    )
                                )}
                            </select>
                        </Form.Field>

                        <Form.Field>
                            <label>Stock</label>
                            <Input
                                type="number"
                                placeholder="Stock"
                                value={formData.Stock}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Stock: e.target.value,
                                    })
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
                                    setFormData({
                                        ...formData,
                                        Precio: e.target.value,
                                    })
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
