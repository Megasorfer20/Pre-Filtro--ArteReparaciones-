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

const postProducto = async (req, res) => {};

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

const updateProducto = async (req, res) => {};

const deleteeProducto = async (req, res) => {};

export {
    getProducto,
    postProducto,
    getOneProducto,
    updateProducto,
    deleteeProducto,
};
