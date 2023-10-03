import { client, conection } from "../conection/conection.js";

const getReparacion = async(req,res) => {
    try {
        const reparecionesDB = (await conection()).Reparaciones
        const repareciones = await reparecionesDB.find({}).toArray();
        res.json(repareciones)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postReparacion = () => {};

const getOneReparacion = () => {};

const updateReparacion = () => {};

const deleteeReparacion = () => {};

export { getReparacion, postReparacion, getOneReparacion, updateReparacion, deleteeReparacion };