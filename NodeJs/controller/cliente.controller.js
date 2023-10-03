import { client, conection } from "../conection/conection.js";

const getCliente = async (req, res) => {
    try {
        const clienteDB = (await conection()).Clientes
        const clientes = await clienteDB.find({}).toArray();
        res.json(clientes)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error (`No se puede conectar a la coleccion`)
    }
};

const postCliente = () => {};

const getOneCliente = () => {};

const updateCliente = () => {};

const deleteeCliente = () => {};

export { getCliente, postCliente, getOneCliente, updateCliente, deleteeCliente };
