import { client, conection } from "../conection/conection.js";

const getSede = async (req,res) => {
    try {
        const sedesDB = (await conection()).Sedes
        const sedes = await sedesDB.find({}).toArray();
        res.json(sedes)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postSede = () => {};

const getOneSede = () => {};

const updateSede = () => {};

const deleteeSede = () => {};

export { getSede, postSede, getOneSede, updateSede, deleteeSede };