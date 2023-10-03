import { client, conection } from "../conection/conection.js";

const getProveedor = async (req,res) => {
    try {
        const proveedoresDB = (await conection()).Proveedores
        const proveedores = await proveedoresDB.find({}).toArray();
        res.json(proveedores)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postProveedor = () => {};

const getOneProveedor = () => {};

const updateProveedor = () => {};

const deleteeProveedor = () => {};

export { getProveedor, postProveedor, getOneProveedor, updateProveedor, deleteeProveedor };