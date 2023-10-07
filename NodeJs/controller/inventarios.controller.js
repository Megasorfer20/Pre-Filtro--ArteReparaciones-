import { client, conection } from "../conection/conection.js";
import { ObjectId } from "mongodb";

const getInventario = async (req, res) => {
    try {
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB.find({}).toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const postInventario = async (req, res) => {
    try {
        const { Producto, Precio, Stock, Proveedor } = req.body;
        const productosDB = (await conection()).Inventarios;
        await productosDB.insertOne({
            Producto,
            Precio,
            Stock,
            Proveedor,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdInventario = new ObjectId(id);
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB
            .find({
                _id: objectIdInventario,
            })
            .toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const getInventarioByProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdProveedor = new ObjectId(id);
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB
            .find({
                Proveedor: objectIdProveedor,
            })
            .toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const updateInventario = async (req, res) => {};

const deleteeInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Inventarios;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export {
    getInventario,
    postInventario,
    getOneInventario,
    updateInventario,
    deleteeInventario,
    getInventarioByProveedor,
};
