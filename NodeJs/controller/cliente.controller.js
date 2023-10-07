import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getCliente = async (req, res) => {
    try {
        const clienteDB = (await conection()).Clientes;
        const clientes = await clienteDB.find({}).toArray();
        res.json(clientes);
    } catch (error) {
        console.log(error);
    }
};

const postCliente = async (req, res) => {
    try {
        const { Nombre, Apellido, Direccion, Telefono, Email } = req.body;
        const productosDB = (await conection()).Clientes;
        await productosDB.insertOne({
            Nombre,
            Apellido,
            Direccion,
            Telefono,
            Email,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const idCliente = new ObjectId(id);
        const clienteDB = (await conection()).Clientes;
        const clientes = await clienteDB
            .find({
                _id: idCliente,
            })
            .toArray();
        res.json(clientes);
    } catch (error) {
        console.log(error);
    }
};

const updateCliente = async (req, res) => {};

const deleteeCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Clientes;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export {
    getCliente,
    postCliente,
    getOneCliente,
    updateCliente,
    deleteeCliente,
};
