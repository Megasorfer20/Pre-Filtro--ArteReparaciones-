import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getEmpleado = async (req, res) => {
    try {
        const empleadosDB = (await conection()).Empleados;
        const empleados = await empleadosDB.find({}).toArray();
        res.json(empleados);
    } catch (error) {
        console.log(error);
    }
};

const postEmpleado = async (req, res) => {
    try {
        const { Nombre, Apellido, Direccion, DNI, Telefono, Sede, Cargo } =
            req.body;
        const productosDB = (await conection()).Empleados;
        await productosDB.insertOne({
            Nombre,
            Apellido,
            Direccion,
            DNI : Number(DNI),
            Telefono: Number(Telefono),
            Sede: new ObjectId(Sede),
            Cargo,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdEmpleado = new ObjectId(id);

        const empleadosDB = (await conection()).Empleados;
        const empleados = await empleadosDB
            .find({
                _id: objectIdEmpleado,
            })
            .toArray();
        res.json(empleados);
    } catch (error) {
        console.log(error);
    }
};

const getEmpleadoBySede = async (req, res) => {
    try {
        const { id } = req.params;
        const objectIdSede = new ObjectId(id);
        const empleadosDB = (await conection()).Empleados;
        const empleados = await empleadosDB
            .find({
                Sede: objectIdSede,
            })
            .toArray();
        res.json(empleados);
    } catch (error) {
        console.log(error);
    }
};

const updateEmpleado = async (req, res) => {};

const deleteeEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Empleados;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export {
    getEmpleado,
    postEmpleado,
    getOneEmpleado,
    updateEmpleado,
    deleteeEmpleado,
    getEmpleadoBySede,
};
