import { client, conection } from "../conection/conection.js";

const getInventario = async (req, res) => {
    try {
        const inventarioDB = (await conection()).Inventarios
        const inventarios = await inventarioDB.find({}).toArray();
        res.json(inventarios)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postInventario = () => {};

const getOneInventario = () => {};

const updateInventario = () => {};

const deleteeInventario = () => {};

export { getInventario, postInventario, getOneInventario, updateInventario, deleteeInventario };