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

const postProveedor = async (req, res) => {};

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

const deleteeProveedor = async (req, res) => {};

export {
    getProveedor,
    postProveedor,
    getOneProveedor,
    updateProveedor,
    deleteeProveedor,
};
