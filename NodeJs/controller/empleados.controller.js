import { client, conection } from "../conection/conection.js";

const getEmpleado = async (req, res) => {
    try {
        const empleadosDB = (await conection()).Empleados
        const empleados = await empleadosDB.find({}).toArray();
        res.json(empleados)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postEmpleado = () => {};

const getOneEmpleado = () => {};

const updateEmpleado = () => {};

const deleteeEmpleado = () => {};

export { getEmpleado, postEmpleado, getOneEmpleado, updateEmpleado, deleteeEmpleado };