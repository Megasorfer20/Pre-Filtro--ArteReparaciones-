import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getEmpleado = async (req, res) => {
  try {
    const empleadosDB = (await conection()).Empleados;
    const empleados = await empleadosDB.find({}).toArray();
    res.json(empleados);
    client.close();
  } catch (error) {
    console.log(error);
  }
};

const postEmpleado = () => {};

const getOneEmpleado = () => {};

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
    client.close();
  } catch (error) {
    console.log(error);
  }
};

const updateEmpleado = () => {};

const deleteeEmpleado = () => {};

export {
  getEmpleado,
  postEmpleado,
  getOneEmpleado,
  updateEmpleado,
  deleteeEmpleado,
  getEmpleadoBySede,
};
