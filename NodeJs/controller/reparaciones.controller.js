import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getReparacion = async (req, res) => {
    try {
        const reparecionesDB = (await conection()).Reparaciones;
        const repareciones = await reparecionesDB.find({}).toArray();
        res.json(repareciones);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const postReparacion = async (req, res) => {};

const getOneReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const idReparacion = new ObjectId(id);
        const reparecionesDB = (await conection()).Reparaciones;
        const repareciones = await reparecionesDB
            .find({
                _id: idReparacion,
            })
            .toArray();
        res.json(repareciones);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const updateReparacion = async (req, res) => {};

const deleteeReparacion = async (req, res) => {};

export {
    getReparacion,
    postReparacion,
    getOneReparacion,
    updateReparacion,
    deleteeReparacion,
};
