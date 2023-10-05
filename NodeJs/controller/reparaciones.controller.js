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

const getEspecificacionesReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const idReparacion = new ObjectId(id);
        const reparecionesDB = (await conection()).Reparaciones;
        const repareciones = await reparecionesDB.aggregate([
            {$match:{_id : idReparacion}},
            {$unwind: "$Especificaciones"},
            {
                $group: {
                    _id: null,
                    Especificaciones: { $push: "$Especificaciones" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Especificaciones: 1
                }
            } 
        ])
            .toArray();

            const especificacionesArray = repareciones[0].Especificaciones

        res.json(especificacionesArray);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getProblemasReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const idReparacion = new ObjectId(id);
        const reparecionesDB = (await conection()).Reparaciones;
        const repareciones = await reparecionesDB.aggregate([
            {$match:{_id : idReparacion}},
            {$unwind: "$Problema"},
            {
                $group: {
                    _id: null,
                    Problema: { $push: "$Problema" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Problema: 1
                }
            } 
        ])
            .toArray();

            const problemasArray = repareciones[0].Problema

        res.json(problemasArray);
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
    getEspecificacionesReparacion,
    getProblemasReparacion
};

