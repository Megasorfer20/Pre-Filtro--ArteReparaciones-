import { client, conection } from "../conection/conection.js";

const getProducto = async (req,res) => {
    try {
        const productosDB = (await conection()).Productos
        const productos = await productosDB.find({}).toArray();
        res.json(productos)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postProducto = () => {};

const getOneProducto = () => {};

const updateProducto = () => {};

const deleteeProducto = () => {};

export { getProducto, postProducto, getOneProducto, updateProducto, deleteeProducto };