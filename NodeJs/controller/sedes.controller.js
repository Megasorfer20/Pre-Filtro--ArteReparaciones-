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

const postSede = async (req, res) => {};

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

const deleteeSede = async (req, res) => {};

export { getSede, postSede, getOneSede, updateSede, deleteeSede };
