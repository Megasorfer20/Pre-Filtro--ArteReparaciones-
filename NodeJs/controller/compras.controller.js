import { client, conection } from "../conection/conection.js";

const getCompra = async (req,res) => {
    try {
        const compraDB = (await conection()).Compras
        const compras = await compraDB.find({}).toArray();
        res.json(compras)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postCompra = () => {};

const getOneCompra = () => {};

const updateCompra = () => {};

const deleteeCompra = () => {};

export { getCompra, postCompra, getOneCompra, updateCompra, deleteeCompra };