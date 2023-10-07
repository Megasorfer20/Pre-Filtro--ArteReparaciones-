import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getSede = async (req, res) => {
    try {
        const sedesDB = (await conection()).Sedes;
        const sedes = await sedesDB.find({}).toArray();
        res.json(sedes);
    } catch (error) {
        console.log(error);
    }
};

const postSede = async (req, res) => {
    try {
        const { NombreSede, Direccion, Telefono, CantidadEmpleados } = req.body;
        const productosDB = (await conection()).Sedes;
        await productosDB.insertOne({
            NombreSede, Direccion, Telefono, CantidadEmpleados
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneSede = async (req, res) => {
    try {
        const { id } = req.params;
        const idSedes = new ObjectId(id);
        const sedesDB = (await conection()).Sedes;
        const sedes = await sedesDB
            .find({
                _id: idSedes,
            })
            .toArray();
        res.json(sedes);
    } catch (error) {
        console.log(error);
    }
};

const updateSede = async (req, res) => {};

const deleteeSede = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Sedes;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export { getSede, postSede, getOneSede, updateSede, deleteeSede };
