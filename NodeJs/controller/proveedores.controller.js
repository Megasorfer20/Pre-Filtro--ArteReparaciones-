import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getProveedor = async (req, res) => {
    try {
        const proveedoresDB = (await conection()).Proveedores;
        const proveedores = await proveedoresDB.find({}).toArray();
        res.json(proveedores);
    } catch (error) {
        console.log(error);
    }
};

const postProveedor = async (req, res) => {
    try {
        const { Nombre, Empresa, Direccion, Telefono, Email } = req.body;
        const productosDB = (await conection()).Proveedores;
        await productosDB.insertOne({
            Nombre,
            Empresa,
            Direccion,
            Telefono,
            Email,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const idProveedor = new ObjectId(id);
        const proveedoresDB = (await conection()).Proveedores;
        const proveedores = await proveedoresDB
            .find({
                _id: idProveedor,
            })
            .toArray();
        res.json(proveedores);
    } catch (error) {
        console.log(error);
    }
};

const updateProveedor = async (req, res) => {};

const deleteeProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Proveedores;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export {
    getProveedor,
    postProveedor,
    getOneProveedor,
    updateProveedor,
    deleteeProveedor,
};
