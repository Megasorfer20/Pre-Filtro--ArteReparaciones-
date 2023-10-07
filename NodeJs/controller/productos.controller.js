import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getProducto = async (req, res) => {
    try {
        const productosDB = (await conection()).Productos;
        const productos = await productosDB.find({}).toArray();
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
};

const postProducto = async (req, res) => {
    try {
        const { Producto, Sede, Stock, Precio } = req.body;
        const productosDB = (await conection()).Productos;
        await productosDB.insertOne({
            Producto,
            Sede,
            Stock,
            Precio,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdProducto = new ObjectId(id);
        const productosDB = (await conection()).Productos;
        const productos = await productosDB
            .find({
                _id: objectIdProducto,
            })
            .toArray();
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const { Producto, Sede, Stock, Precio } = req.body;
        const productosDB = (await conection()).Productos;
        const productos = await productosDB.findOneAndReplace(
            {
                _id: productoId,
            },
            { Producto, Sede, Stock, Precio }
        );
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const deleteeProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Productos;
        await productosDB.deleteOne(
            {
                _id:productoId,
            }
        );
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export {
    getProducto,
    postProducto,
    getOneProducto,
    updateProducto,
    deleteeProducto,
};
