import { client, conection } from "../conection/conection.js";
import { ObjectId } from "mongodb";

const getInventario = async (req, res) => {
    try {
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB.find({}).toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const postInventario = async (req, res) => {};

const getOneInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdInventario = new ObjectId(id);
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB
            .find({
                _id: objectIdInventario,
            })
            .toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const getInventarioByProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdProveedor = new ObjectId(id);
        const inventarioDB = (await conection()).Inventarios;
        const inventarios = await inventarioDB
            .find({
                Proveedor: objectIdProveedor,
            })
            .toArray();
        res.json(inventarios);
    } catch (error) {
        console.log(error);
    }
};

const updateInventario = async (req, res) => {};

const deleteeInventario = async (req, res) => {};

export {
    getInventario,
    postInventario,
    getOneInventario,
    updateInventario,
    deleteeInventario,
    getInventarioByProveedor,
};
